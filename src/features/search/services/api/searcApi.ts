import apiRequest from "@/shared/api/apiRequest";
import { LatLng } from "@/shared/types/common";
import {
  AllDepartments,
  DepartmentResponse,
} from "../../types/department.types";
import {
  NearbyPlacesResponse,
  SearchDetailResponse,
  SearchParamType,
} from "../../types/search.types";
import { AllRegions, RegionResponse } from "../../types/region.types";

// 근처 병원 검색
export const fetchNearbySearch = async (
  url: string,
  currLocation: LatLng,
  size = 20,
  department?: AllDepartments | null,
  region?: AllRegions | null,
  type?: SearchParamType | null
): Promise<NearbyPlacesResponse[]> => {
  const res = await apiRequest({
    url,
    params: {
      lat: currLocation.latitude!.toString(),
      lng: currLocation.longitude!.toString(),
      size: size.toString(),
      ...(department ? { department } : {}),
      ...(region ? { sido: region } : {}),
      ...(type ? { type } : {}),
    },
  });

  return res.data;
};

// 진료과 리스트
export const getDepartments = async (
  url: string
): Promise<DepartmentResponse[]> => {
  const res = await apiRequest({
    url,
  });

  return res.data;
};

// 지역(시,도) 리스트
export const getRegions = async (url: string): Promise<RegionResponse[]> => {
  const res = await apiRequest({
    url,
  });

  return res.data;
};

export const getDetailInfo = async (
  url: string
): Promise<SearchDetailResponse> => {
  const res = await apiRequest({
    url,
  });

  return res.data;
};
