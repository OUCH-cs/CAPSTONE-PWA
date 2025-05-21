import { atom } from "jotai";

// 현재 페이지 상태 관리 (main | add)
export const currentPageAtom = atom<"main" | "add">("main");

// 페이지 상태를 변경하는 쓰기 전용 atom
export const setPageAtom = atom(
  null,
  (_get, set, step: "main" | "add") => {
    set(currentPageAtom, step);
  }
)

export const selectedSystemAtom = atom<string>("");

export const selectedConditionAtom = atom<string | null>(null);

export const selectedSymptomAtom = atom<string>("");

export const languageCodeAtom = atom<string>("en"); 