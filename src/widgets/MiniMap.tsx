import styled from "@emotion/styled";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import CustomMarker from "@/entities/map/ui/CustomMarker";
import { useTranslation } from "react-i18next";
import { SearchDetailResponse } from "@/features/search/types/search.types";

interface MiniMapProps {
  lat: number;
  lng: number;
  data: SearchDetailResponse;
}

export default function MiniMap({ lat, lng, data }: MiniMapProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleClick = () => {
    navigate("/map", {
      state: {
        lat: data.lat,
        lng: data.lng,
        name: data.name,
        address: data.address,
        type: data.type,
      },
    });
  };

  return (
    <Container onClick={handleClick}>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        language={i18n.language}
      >
        <Map
          style={{ width: "328px", height: "152px" }}
          defaultZoom={17}
          defaultCenter={{ lat, lng }}
          gestureHandling="greedy"
          disableDefaultUI
          keyboardShortcuts={false} // “단축키” 문구 삭제
        >
          <CustomMarker lat={lat} lng={lng} markerSize={28} />
        </Map>
      </APIProvider>
    </Container>
  );
}

const Container = styled.div``;
