import { atom } from "jotai";

export const selectedSystemAtom = atom<string>("");

export const selectedConditionAtom = atom<string | null>(null);

export const selectedSymptomAtom = atom<string>("");

export const languageCodeAtom = atom<string>("en"); 

//자가진단폼 외부의 추천 페이지에서 destination상태 필요하여 전역으로 관리
export const destinationAtom = atom<string>("HOSPITAL"); 