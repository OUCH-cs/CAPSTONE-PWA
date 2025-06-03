import { Marker } from "@vis.gl/react-google-maps";

interface CustomMarkerProps {
  lat: number;
  lng: number;
  markerSize: number;
  onClick?: () => void;
}

export default function CustomMarker({
  lat,
  lng,
  markerSize,
  onClick,
}: CustomMarkerProps) {
  return (
    <Marker
      position={{ lat, lng }}
      icon={{
        url: "/icons/marker.svg",
        scaledSize: new google.maps.Size(markerSize, markerSize),
      }}
      onClick={onClick}
    />
  );
}
