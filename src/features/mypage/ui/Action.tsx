import styled from "@emotion/styled";
import Like from "@/shared/assets/mypage/like.svg?react";
import Favorite from "@/shared/assets/mypage/favorite.svg?react";
import Review from "@/shared/assets/mypage/review.svg?react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Action = () => {
  const { t } = useTranslation();

  return (
    <Header>
      <LinkSection to="/mypage/review">
        <Review width="24px" height="24px" />
        <TitleText>{t("Review")}</TitleText>
      </LinkSection>

      <SectionMid>
        <Like width="24px" height="24px" />
        <TitleText>{t("Like")}</TitleText>
      </SectionMid>

      <Section>
        <Favorite width="24px" height="24px" />
        <TitleText>{t("Favorite")}</TitleText>
      </Section>
    </Header>
  );
};

export default Action;



const Header = styled.div`
  margin : 26px 16px 0 16px;
  height:80px;
  border-radius: 10px;
  background-color: #FFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;
   gap: 20px;
  padding: 1rem ;
`;

const Section = styled.div`
width:109px;
display: flex;
flex-direction: column;  
justify-content: center;
align-items: center;
`;
const SectionMid = styled.div`
  width: 160px;
  height:80px;
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  border-left: 1px solid #F1F3F5;
  border-right: 1px solid #F1F3F5;
`;


const TitleText = styled.p`
  color : #000;
  font-size:14px;
  font-weight: 400;
  margin-top:4px;
`;
const LinkSection = styled(Link)`
  width: 109px;
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  text-decoration: none;  // 링크 밑줄 제거
`;