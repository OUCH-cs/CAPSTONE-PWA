import apiRequest from "@/shared/api/apiRequest";
import { LatLng } from "@/shared/types/common";
import { DepartmentResponse } from "../../types/department.types";
import { NearbyPlacesResponse } from "../../types/search.types";

export const fetchNearbySearch = async (
  url: string,
  currLocation: LatLng,
  size = 20
): Promise<NearbyPlacesResponse[]> => {
  const res = await apiRequest({
    url,
    params: {
      lat: currLocation.latitude!.toString(),
      lng: currLocation.longitude!.toString(),
      size: size.toString(),
    },
  });

  return res.data;
};

export const getDepartment = async (
  url: string
): Promise<DepartmentResponse[]> => {
  const res = await apiRequest({
    url,
  });

  return res.data;
};
