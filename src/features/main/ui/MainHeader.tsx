import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import HomeLocation from "@/shared/assets/home/HomeLocation.svg?react";
import { useLanguage } from "@/shared/services/useLanguage";
import { useTranslation } from "react-i18next";

const MainHeader = () => {
  const { languageCode, handleLangChange } = useLanguage();
  const { t } = useTranslation();

  return (
    <Header>
      <Location>
        <HomeLocation width={"16px"} height={"21px"} />
        <LocationText>{t("Sadong, Sangnok-gu")}</LocationText>
      </Location>
      <LangSelect value={languageCode} onChange={handleLangChange}>
        <option value="en-US">EN</option>
        <option value="ko-KR">한국어</option>
        <option value="zh-CN">中文</option>
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
  position: relative;
  font-size: 1.3rem;
  background-color: ${theme.colors.background};
  cursor: pointer;
`;
