import { atom } from "jotai";

export const selectedSystemAtom = atom<string>("");

export const selectedConditionAtom = atom<string | null>(null);

export const selectedSymptomAtom = atom<string>("");

export const languageCodeAtom = atom<string>("en"); 

export const destinationAtom = atom<string>("HOSPITAL"); 