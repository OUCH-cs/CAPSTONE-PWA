import { LanguageCode } from "@/shared/types/common";
import {
  REGION_NAMES_EN,
  REGION_NAMES_KR,
  REGION_NAMES_ZH,
} from "../search.consts";

interface Region {
  kr: string;
  en: string;
  zh: string;
}

// const 배열에서 타입 추출 -> 각 언어별 진료과 이름 리터럴 유니온
type KRRegion = (typeof REGION_NAMES_KR)[number];
type ENRegion = (typeof REGION_NAMES_EN)[number];
type ZHRegion = (typeof REGION_NAMES_ZH)[number];

// 언어 코드에 따른 매핑 객체
type LangRegionMap = {
  kr: KRRegion;
  en: ENRegion;
  zh: ZHRegion;
};

// 해당 언어의 리터럴 유니언 반환
type DepartmentNameByLang<L extends LanguageCode> = LangRegionMap[L];

// 모든 언어 유니온
type AllRegions = LangRegionMap[LanguageCode];

// API 응답 타입
interface RegionResponse {
  kr: DepartmentNameByLang<"kr">;
  en: DepartmentNameByLang<"en">;
  zh: DepartmentNameByLang<"zh">;
}

export type { Region, AllRegions, RegionResponse };
