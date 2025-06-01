import { Marker } from "@vis.gl/react-google-maps";

interface CustomMarkerProps {
  lat: number;
  lng: number;
  markerSize: number;
}

export default function CustomMarker({
  lat,
  lng,
  markerSize,
}: CustomMarkerProps) {
  const customMarkerUrl = "/src/shared/assets/map/marker.svg";

  return (
    <Marker
      position={{ lat, lng }}
      icon={{
        url: customMarkerUrl,
        scaledSize: new google.maps.Size(markerSize, markerSize),
      }}
    />
  );
}
