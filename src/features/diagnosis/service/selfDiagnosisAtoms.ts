import { atom } from "jotai";

// 현재 페이지 상태 관리 (main | add)
export const currentPageAtom = atom<"main" | "add">("main");

// 페이지 상태를 변경하는 쓰기 전용 atom
export const setPageAtom = atom(
  null,
  (_get, set, step: "main" | "add") => {
    set(currentPageAtom, step);
  }
);

// 사용자 커스텀 증상 배열 상태
export const customSymptomsAtom = atom<string[]>([]);

// 증상 추가 로직 atom (기존 배열에 추가)
export const addSymptomAtom = atom(
  null,
  (get, set, symptom: string) => {
    const prev = get(customSymptomsAtom);
    set(customSymptomsAtom, [...prev, symptom]);
  }
);

// 증상 제거 로직 atom (특정 항목 제거)
export const removeSymptomAtom = atom(
  null,
  (get, set, symptom: string) => {
    const prev = get(customSymptomsAtom);
    set(customSymptomsAtom, prev.filter((s) => s !== symptom));
  }
);