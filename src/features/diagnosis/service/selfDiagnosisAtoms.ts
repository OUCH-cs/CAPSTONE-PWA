import { atom } from "jotai";

// 현재 페이지 상태 관리 (main | add)
export const currentPageAtom = atom<"main" | "add">("main");

export const setPageAtom = atom(
  null,
  (_get, set, step: "main" | "add") => {
    set(currentPageAtom, step);
  }
);

// 추가 증상 상태 관리
export const customSymptomsAtom = atom<string[]>([]);

export const addSymptomAtom = atom(
  null,
  (get, set, symptom: string) => {
    const prev = get(customSymptomsAtom);
    set(customSymptomsAtom, [...prev, symptom]);
  }
);

export const removeSymptomAtom = atom(
  null,
  (get, set, symptom: string) => {
    const prev = get(customSymptomsAtom);
    set(customSymptomsAtom, prev.filter((s) => s !== symptom));
  }
);