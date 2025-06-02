import styled from "@emotion/styled";
import { useLanguage } from "@/shared/services/useLanguage";
import theme from "@/shared/styles/theme";
import { useTranslation } from "react-i18next";

const TopHeader = () => {
  const { languageCode, handleLangChange } = useLanguage();
  const {t} =  useTranslation();


  return (
    <Header>
      <Location>
        <PageText>{t("My page")}</PageText>
      </Location>
      <LangSelect value={languageCode} onChange={handleLangChange}>
        <option value="en-US">EN</option>
        <option value="ko-KR">한국어</option>
        <option value="zh-CN">中文</option>
      </LangSelect>
    </Header>
  );
};

export default TopHeader;

// 스타일 그대로 분리
const Header = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
  margin-bottom: 40px;
  position: relative; 
`;

const Location = styled.div`
  display: flex;
`;

const PageText = styled.p`
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
`;

const LangSelect = styled.select`
  font-size: 1.3rem;
  background-color: ${theme.colors.background};
  cursor: pointer;
`;
