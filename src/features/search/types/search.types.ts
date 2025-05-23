import { LanguageCode, LatLng } from "@/shared/types/common";

type Sort = "Recommended" | "Distance";

type SearchRequestBase = {
  languageCode: LanguageCode;
};

// 장소 텍스트 검색 요청 타입
type TextSearchRequest = SearchRequestBase & {
  textQuery: string;
  includedType?: string;
  rankPreference?: "DISTANCE" | "RELEVANCE";
};

// 장소 기본 정보 타입
interface PlaceBase {
  displayName: {
    text: string;
    languageCode: string;
  };
  id: string;
  location: LatLng;
  primaryTypeDisplayName: {
    languageCode: string;
    text: string;
  };
}

interface Place extends PlaceBase {
  currentOpeningHours: {
    openNow: boolean;
    weekdayDescriptions: string[];
  };
  types: string[];
  rating: number;
}

interface PlaceDetail extends PlaceBase {
  formattedAddress: string;
  nationalPhoneNumber: string;
  primaryType: string;
}

// NEW

interface NearbyPlacesResponse {
  address: string;
  distance: number;
  lat: number;
  lng: number;
  name: string;
  tel: string;
  ykiho: string;
}

export type {
  Sort,
  TextSearchRequest,
  Place,
  PlaceDetail,
  NearbyPlacesResponse,
};
