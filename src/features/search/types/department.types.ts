import { LanguageCode } from "@/shared/types/common";
import { DEPARTMENT_NAMES_EN, DEPARTMENT_NAMES_KR } from "../search.consts";

// const 배열에서 타입 추출 -> 각 언어별 진료과 이름 리터럴 유니온
type KRDepartment = (typeof DEPARTMENT_NAMES_KR)[number];
type ENDepartment = (typeof DEPARTMENT_NAMES_EN)[number];

// 언어 코드에 따른 매핑 객체
type LangDepartmentMap = {
  kr: KRDepartment;
  en: ENDepartment;
};

// 해당 언어의 리터럴 유니언 반환
type DepartmentNameByLang<L extends LanguageCode> = LangDepartmentMap[L];

// 모든 언어 유니온
type AllDepartments = LangDepartmentMap[LanguageCode];

// API 응답 타입
interface DepartmentResponse {
  code: number;
  nameKr: DepartmentNameByLang<"kr">;
  nameEn: DepartmentNameByLang<"en">;
}

export type {
  KRDepartment,
  ENDepartment,
  DepartmentNameByLang,
  DepartmentResponse,
  LangDepartmentMap,
  AllDepartments,
};
