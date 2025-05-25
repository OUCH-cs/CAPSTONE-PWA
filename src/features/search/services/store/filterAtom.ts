import { atom } from "jotai";
import { SearchParamType, Sort } from "../../types/search.types";
import { AllDepartments } from "../../types/department.types";

// 진료과 검색
const departmentFilterAtom = atom<AllDepartments | null>(null);

// 정렬 필터
const sortFilterAtom = atom<Sort>("Recommended");

// 검색 파라미터
const searchQueryAtom = atom<string>("");

// 종별 코드명 검색 파라미터
const searchTypeAtom = atom<SearchParamType | null>(null);

export {
  departmentFilterAtom,
  sortFilterAtom,
  searchQueryAtom,
  searchTypeAtom,
};
