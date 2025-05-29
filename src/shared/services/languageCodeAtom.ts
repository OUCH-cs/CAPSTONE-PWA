import "@/features/i18n/i18n";
import { atomWithStorage } from "jotai/utils";

export const languageCodeAtom = atomWithStorage<"ko-KR" | "en-US" | "zh-CN">(
  "i18nextLng",
  "en-US"
);
