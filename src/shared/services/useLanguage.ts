import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { languageCodeAtom } from "@/shared/services/languageCodeAtom";
import { useEffect } from "react";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [languageCode, setLanguageCode] = useAtom(languageCodeAtom);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as "ko" | "en" | "zh";

    setLanguageCode(lang);
    i18n.changeLanguage(lang);
  };

  // 최초 마운트 시 localStorage와 Atom 상태 맞추기
  useEffect(() => {
    const stored = localStorage.getItem("i18nextLng") as "ko" | "en" | "zh";

    setLanguageCode(stored);
    i18n.changeLanguage(stored);
  }, []);

  return {
    languageCode,
    handleLangChange,
  };
};
