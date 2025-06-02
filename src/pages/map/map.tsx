import MapContent from "@/features/map/ui/MapContent";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useTranslation } from "react-i18next";

function MapPage() {
  const { i18n } = useTranslation();
  const languageCode = i18n.language;

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      language={languageCode}
      libraries={["places"]}
    >
      <MapContent />
    </APIProvider>
  );
}

export { MapPage };
