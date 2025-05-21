import MapContent from "@/features/map/ui/MapContent";
import { APIProvider } from "@vis.gl/react-google-maps";

function MapPage() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <MapContent />
    </APIProvider>
  );
}

export { MapPage };
