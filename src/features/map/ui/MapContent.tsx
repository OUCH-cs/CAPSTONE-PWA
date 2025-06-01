import styled from "@emotion/styled";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { fallbackLocaton } from "../map.consts";
import { useLocation } from "react-router-dom";
import CustomMarker from "@/entities/map/ui/CustomMarker";
import SummaryInfoCard from "@/entities/map/ui/SummaryInfoCard";

export default function MapContent() {
  const location = useLocation();
  const map = useMap();
  const placesLib = useMapsLibrary("places") as typeof google.maps.places;

  useEffect(() => {
    if (!map || !placesLib) return;

    const service = new placesLib.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: fallbackLocaton,
      radius: 1000,
      type: "hospital",
      language: "zh",
    };

    // service.nearbySearch(request, (results, status) => {
    //   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
    //     // console.log("Nearby places:", results);

    //     results.forEach((place) => {
    //       if (!place.geometry || !place.geometry.location) return;

    //       new google.maps.Marker({
    //         map,
    //         position: place.geometry.location,
    //         title: place.name,
    //       });
    //     });
    //     2;
    //   } else {
    //     console.warn("NearbySearch failed:", status);
    //   }
    // });
  }, [map, placesLib, location]);

  return (
    location && (
      <Container>
        <Map
          defaultCenter={
            location.state
              ? { lat: location.state.lat, lng: location.state.lng }
              : fallbackLocaton
          }
          defaultZoom={16}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {location.state && (
            <CustomMarker
              lat={location.state.lat}
              lng={location.state.lng}
              markerSize={50}
            />
          )}
          {location.state && <SummaryInfoCard data={location.state} />}
        </Map>
      </Container>
    )
  );
}

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100dvh;
`;
