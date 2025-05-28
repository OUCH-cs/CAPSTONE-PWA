import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en-US/translation.json"; // locales 폴더내에 생성
import ko from "./locales/ko-KR/translation.json"; // locales 폴더내에 생성
import zh from "./locales/zh-CN/translation.json";

const resources = {
  "ko-KR": { translation: ko },
  "en-US": { translation: en },
  "zh-CN": { translation: zh },

};

i18n
  .use(LanguageDetector) // 사용자 언어 감지
  .use(initReactI18next) // i18n 인스턴스를 react-i18next로 전달
  // i18next를 init
  .init({
    resources,
    fallbackLng: "en-US",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;