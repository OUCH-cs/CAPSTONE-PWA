import { useEffect, useState } from "react";
import { NearbyRequest, Place } from "../search.types";
import { LatLng } from "@/features/map/map.types";
import searchQuery from "./api/searchQuery";
import { useAtomValue } from "jotai";
import { departmentFilterAtom, sortFilterAtom } from "./store/filterAtom";

const useNearbySearch = (currLocation: LatLng | null) => {
  const department = useAtomValue(departmentFilterAtom); // department 필터링
  const sort = useAtomValue(sortFilterAtom); // sort 필터링

  const [places, setPlaces] = useState<Place[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchNearbyPlaces = async (requestData: NearbyRequest) => {
    if (!currLocation) return;

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
    // 필터링된 과에 따라 검색
    // 없으면 모든 병원, 약국 검색
    const includedTypes = department
      ? [department === "Hospital" ? "hospital" : "pharmacy"]
      : ["hospital", "pharmacy"];

    const rankPreference = sort === "Recommended" ? "POPULARITY" : "DISTANCE";

    const requestData: NearbyRequest = {
      includedTypes,
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
      rankPreference, // DISTANCE, POPULARITY
    };

    fetchNearbyPlaces(requestData);
  }, [department, sort]);

  return { isPending, isSuccess, isError, places };
};

export { useNearbySearch };
