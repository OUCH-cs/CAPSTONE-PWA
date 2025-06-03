import { atom } from "jotai";
import { Sort } from "../../types/search.types";
import { AllDepartments } from "../../types/department.types";
import { AllRegions } from "../../types/region.types";

// 병원 | 약국 필터
const typeFilterAtom = atom<"병원" | "약국" | null>(null);

// 진료과 검색
const departmentFilterAtom = atom<AllDepartments | null>(null);

// 지역(시,도) 검색
const regionFilterAtom = atom<AllRegions | null>(null);

// 정렬 필터
const sortFilterAtom = atom<Sort>("Recommended");

// 검색 파라미터
const searchQueryAtom = atom<string>("");

export {
  departmentFilterAtom,
  regionFilterAtom,
  sortFilterAtom,
  searchQueryAtom,
  typeFilterAtom,
};
