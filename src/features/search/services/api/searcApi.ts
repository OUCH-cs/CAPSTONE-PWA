import apiRequest from "@/shared/api/apiRequest";
import { LatLng } from "@/shared/types/common";
import {
  AllDepartments,
  DepartmentResponse,
} from "../../types/department.types";
import { NearbyPlacesResponse } from "../../types/search.types";

// 근처 병원 검색
export const fetchNearbySearch = async (
  url: string,
  currLocation: LatLng,
  size = 20,
  department?: AllDepartments | null
): Promise<NearbyPlacesResponse[]> => {
  const res = await apiRequest({
    url,
    params: {
      lat: currLocation.latitude!.toString(),
      lng: currLocation.longitude!.toString(),
      size: size.toString(),
      ...(department ? { department } : {}),
    },
  });

  return res.data;
};

// 진료과 리스트
export const getDepartment = async (
  url: string
): Promise<DepartmentResponse[]> => {
  const res = await apiRequest({
    url,
  });

  return res.data;
};
