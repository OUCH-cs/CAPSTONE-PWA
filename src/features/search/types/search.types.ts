type Sort = "Recommended" | "Distance";
type SearchParamType = "병원" | "약국";

interface PlacesResponseBase {
  ykiho: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  tel: string;
}

// 주변 병원 API 응답 타입
interface NearbyPlacesResponse extends PlacesResponseBase {
  distance: number;
}

interface SearchDetailResponse extends PlacesResponseBase {
  type: string;
  zipcode: string;
  departments: {
    departmentName: string;
    specialistCount: number;
  }[];
}

export type {
  Sort,
  SearchParamType,
  NearbyPlacesResponse,
  SearchDetailResponse,
};
