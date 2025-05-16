import { useEffect, useState } from "react";
import { NearbyRequest, Place } from "../search.types";
import { LatLng } from "@/features/map/map.types";
import searchQuery from "./api/searchQuery";

const useNearbySearch = (currLocation: LatLng | null) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchNearbyPlaces = async () => {
    if (!currLocation) return;

    const requestData: NearbyRequest = {
      includedTypes: ["hospital", "pharmacy"],
      maxResultCount: 20,
      languageCode: "en",
      locationRestriction: {
        circle: {
          center: {
            latitude: currLocation?.latitude,
            longitude: currLocation?.longitude,
          },
          radius: 2000.0,
        },
      },
      rankPreference: "POPULARITY", // DISTANCE, POPULARITY
    };

    try {
      setIsPending(true);

      const { data } = await searchQuery({
        url: ":searchNearby",
        method: "POST",
        data: requestData,
      });

      setPlaces(data.places);
      setIsSuccess(true);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchNearbyPlaces();
  }, []);

  return { isPending, isSuccess, isError, places };
};

export { useNearbySearch };
