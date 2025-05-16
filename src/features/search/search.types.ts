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

interface Place {
  currentOpeningHours: {
    openNow: boolean;
    weekdayDescriptions: string[];
  };
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
  types: string[];
  rating: number;
}

export type { NearbyRequest, TextSearchRequest, Place };
