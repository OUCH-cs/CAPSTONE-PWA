import { useEffect, useState } from "react";
import { NearbyPlacesResponse, Place } from "../types/search.types";
import searchQuery from "./api/searchQuery";
import { useAtomValue } from "jotai";
import { departmentFilterAtom, sortFilterAtom } from "./store/filterAtom";
import apiRequest from "@/shared/api/apiRequest";
import { LatLng } from "@/shared/types/common";

const useNearbySearch = (currLocation: LatLng | null, size = 20) => {
  const department = useAtomValue(departmentFilterAtom); // department 필터링
  const sort = useAtomValue(sortFilterAtom); // sort 필터링

  const [places, setPlaces] = useState<NearbyPlacesResponse[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchNearbyPlaces = async () => {
    if (!currLocation) return;

    try {
      setIsPending(true);

      const { data } = await apiRequest({
        url: "/hospitals/search",
        params: {
          lat: currLocation.latitude?.toString() || "",
          lng: currLocation.longitude?.toString() || "",
          size: size.toString(),
        },
      });

      setPlaces(data);
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
  }, [department, sort, currLocation]);

  return { isPending, isSuccess, isError, places };
};

export { useNearbySearch };
