type Sort = "Recommended" | "Distance";
type SearchParamType =
  | "병원"
  | "약국"
  | "Hospital"
  | "Pharmacy"
  | "医院"
  | "药房";

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
  type: SearchParamType;
}

interface SearchDetailResponse extends PlacesResponseBase {
  type: string;
  zipcode: string;
  departments: {
    departmentName: string;
    specialistCount: number;
  }[];
}

interface ReviewRequest {
  hospitalYkiho: string;
  contents: string;
  score: number;
  imageUrl: string;
}

interface ReviewResponse {
  id: number;
  userNickname: string;
  hospitalYkiho: string;
  contents: string;
  score: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type {
  Sort,
  SearchParamType,
  NearbyPlacesResponse,
  SearchDetailResponse,
  ReviewRequest,
  ReviewResponse,
};
