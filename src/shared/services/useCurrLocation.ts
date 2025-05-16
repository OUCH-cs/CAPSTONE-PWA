import { useEffect, useState } from "react";
import { LatLng } from "@/features/map/map.types";
import { getCurrLocation } from "../lib/getCurrLocation";
import { fallbackLocaton } from "../consts/common";

const useCurrLocation = () => {
  const [location, setLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    getCurrLocation()
      .then((pos) => setLocation(pos))
      .catch((error) => {
        console.error("Error getting current location:", error);
        setLocation(fallbackLocaton);
      });
  }, []);

  return location;
};

export { useCurrLocation };
