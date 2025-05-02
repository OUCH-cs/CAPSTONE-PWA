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

const STORAGE_KEY = "customSymptoms";

const getInitialSymptoms = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// 사용자 커스텀 증상 배열 상태
export const customSymptomsAtom = atom<string[]>(getInitialSymptoms());

export const addSymptomAtom = atom(
  null,
  (get, set, symptom: string) => {
    const updated = [...get(customSymptomsAtom), symptom];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set(customSymptomsAtom, updated);
  }
);

export const removeSymptomAtom = atom(
  null,
  (get, set, symptom: string) => {
    const updated = get(customSymptomsAtom).filter((s) => s !== symptom);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set(customSymptomsAtom, updated);
  }
);