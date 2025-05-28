import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import HomeLocation from "@/shared/assets/home/HomeLocation.svg?react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { languageCodeAtom } from "@/shared/services/languageCodeAtom";


const MainHeader = () => {
  const { i18n } = useTranslation();
  const [languageCode, setLanguageCode] = useAtom(languageCodeAtom);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguageCode(lang);

    switch (lang) {
      case "ko":
        i18n.changeLanguage("ko-KR");
        break;
      case "en":
        i18n.changeLanguage("en-US");
        break;
      case "zh":
        i18n.changeLanguage("zh-CN");
        break;
      default:
        break;
    }
  };

  return (
    <Header>
      <Location>
        <HomeLocation width={"16px"} height={"21px"} />
        <LocationText>Banseok-dong</LocationText>
      </Location>
      <LangSelect value={languageCode} onChange={handleLangChange}>
        <option value="ko">KO</option>
        <option value="en">ENG</option>
        <option value="zh">中文</option>
      </LangSelect>
    </Header>
  );
};

export default MainHeader;

// 스타일 그대로 분리
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2.3rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
`;

const LocationText = styled.p`
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const LangSelect = styled.select`
  font-size: 1.3rem;
  background-color: ${theme.colors.background};
  cursor: pointer;
`;