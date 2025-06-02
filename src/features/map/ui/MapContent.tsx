import styled from "@emotion/styled";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { fallbackLocaton } from "../map.consts";
import { useLocation } from "react-router-dom";
import CustomMarker from "@/entities/map/ui/CustomMarker";
import SummaryInfoCard from "@/entities/map/ui/SummaryInfoCard";
import SearchBar from "@/entities/map/ui/SearchBar";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { departmentAtom } from "@/entities/map/services/atom";
import { SummaryInfo } from "@/entities/map/map.types";

type PlaceResult = google.maps.places.PlaceResult;

export default function MapContent() {
  const location = useLocation();
  const map = useMap();
  const { i18n } = useTranslation();
  const languageCode = i18n.language;
  const placesLib = useMapsLibrary("places") as typeof google.maps.places;

  const department = useAtomValue(departmentAtom); // "hospital" 또는 "pharmacy"

  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<SummaryInfo | null>(null);

  // 마커 클릭 핸들링
  const handleMarkerClick = (place: PlaceResult, lat: number, lng: number) => {
    if (!place) return;

    const placeInfo = {
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      lat: lat,
      lng: lng,
      type: place.types?.[0], // 기본값 설정
      tel: "031-",
    };

    setSelectedPlace(placeInfo);
  };

  // department에 따른 마커 렌더링 로직
  useEffect(() => {
    if (!map || !placesLib) return;

    const service = new placesLib.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: fallbackLocaton,
      radius: 1200,
      type: department || undefined,
      language: languageCode,
    };

    service.nearbySearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        // 검색 결과를 로컬 상태에 저장하면, 아래 JSX에서 CustomMarker가 렌더됩니다.
        setPlaces(results);
        setSelectedPlace(null);
      } else {
        console.error("PlacesService 에러:", status);
        setPlaces([]);
        setSelectedPlace(null);
      }
    });
  }, [map, placesLib, department]);

  return (
    location && (
      <Container>
        <SearchBar />

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
          {/* 미니맵에서 클릭해서 왔을 때 */}
          {location.state && (
            <>
              <CustomMarker
                lat={location.state.lat}
                lng={location.state.lng}
                markerSize={50}
              />
            </>
          )}

          {/*
                3) department가 "hospital" 또는 "pharmacy"인 경우:
                   • places 배열을 순회하며 CustomMarker 표시
                   • CustomMarker 클릭하면 해당 PlaceResult를 selectedPlace에 저장
              */}
          {department !== null &&
            places.map((place) => {
              if (!place.geometry?.location) return null;
              const { lat, lng } = place.geometry.location.toJSON();

              return (
                <CustomMarker
                  key={place.place_id}
                  lat={lat}
                  lng={lng}
                  markerSize={50}
                  onClick={() => handleMarkerClick(place, lat, lng)}
                />
              );
            })}

          {(location.state || selectedPlace) && (
            <SummaryInfoCard data={location.state || selectedPlace} />
          )}
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
