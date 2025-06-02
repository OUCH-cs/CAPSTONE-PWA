import styled from "@emotion/styled";
import { useLanguage } from "@/shared/services/useLanguage";
import { useTranslation } from "react-i18next";
import Options from "@/shared/assets/mypage/option.svg?react"

const languageLabelMap: Record<string, string> = {
  en: "ENG",
  ko: "한국어",
  zh: "中文",
};

const TopHeader = () => {
  const { languageCode } = useLanguage();
  const { t } = useTranslation();

  return (
    <Header>
      <Location>
        <PageText>{t("My page")}</PageText>
      </Location>

      <RightWrapper>
        <SelectedLanguage>{languageLabelMap[languageCode] || languageCode}</SelectedLanguage>
        <Options width="20px" height="20px" />
      </RightWrapper>
    </Header>
  );
};

export default TopHeader;

const Header = styled.div`
  margin-top: 10px;
  display: flex;
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

const SelectedLanguage = styled.div`
position: relative;
  font-size: 16px;
  color: #000;
  font-weight: 400;
  top:0px;
`;

const RightWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px; 
`;
