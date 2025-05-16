import { LanguageCode } from "@/shared/types/common";
import { LatLng } from "../map/map.types";

type Location = {
  circle: {
    center: LatLng;
    radius: number;
  };
};

type SearchRequestBase = {
  languageCode: LanguageCode;
};

// 근처 장소 검색 요청 타입
type NearbyRequest = SearchRequestBase & {
  includedTypes: string[];
  maxResultCount: number;
  locationRestriction: Location;
  rankPreference: "DISTANCE" | "POPULARITY";
};

// 장소 텍스트 검색 요청 타입
type TextSearchRequest = SearchRequestBase & {
  textQuery: string;
  includedType?: string;
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

export type { NearbyRequest, TextSearchRequest, Place, PlaceDetail };
