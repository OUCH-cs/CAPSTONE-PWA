import "@/features/i18n/i18n";
import { atomWithStorage } from "jotai/utils";

export const languageCodeAtom = atomWithStorage<"ko" | "en" | "zh">(
  "i18nextLng",
  "en"
);
