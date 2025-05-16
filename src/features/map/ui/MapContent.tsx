import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useCurrLocation } from "@/shared/services/useCurrLocation";

export default function MapContent() {
  const location = useCurrLocation();
  const map = useMap();
  const placesLib = useMapsLibrary("places") as typeof google.maps.places;

  const fallbackLocaton: google.maps.LatLngLiteral = {
    // 라이온스 홀
    lat: 37.295831,
    lng: 126.841256,
  };

  useEffect(() => {
    if (!location || !map || !placesLib) return;

    const service = new placesLib.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: fallbackLocaton,
      radius: 1000,
      type: "hospital",
      language: "af",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log("Nearby places:", results);

        results.forEach((place) => {
          if (!place.geometry || !place.geometry.location) return;

          new google.maps.Marker({
            map,
            position: place.geometry.location,
            title: place.name,
          });
        });
      } else {
        console.warn("NearbySearch failed:", status);
      }
    });
  }, [map, placesLib, location]);

  return (
    location && (
      <Map
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={fallbackLocaton}
        defaultZoom={15}
        gestureHandling="greedy"
        disableDefaultUI
      />
    )
  );
}
