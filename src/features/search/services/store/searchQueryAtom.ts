import { atom } from "jotai";
import { Place } from "../../search.types";

export const textQueryAtom = atom("");
export const isTextQueryPending = atom(false);
export const isTextQuerySuccess = atom(false);
export const isTextQueryError = atom(false);
const searchQueryAtomResults = atom<Place[]>([]);

export { searchQueryAtomResults };
