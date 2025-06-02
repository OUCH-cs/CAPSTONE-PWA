import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditHeader = () => {
  const {t} =  useTranslation();

  return (
    <Header>
      <BackLink to="/mypage">
        <ArrowIcon width="25px" height="25px" stroke="black" />
      </BackLink>
      <TitleText>{t("Edit Profile")}</TitleText>
    </Header>
  );
};

export default EditHeader;

const Header = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 16px;
  margin-bottom: 40px;
  position: relative;
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
  position: absolute; /* TitleText를 중앙에 위치시킴 */
`;

const BackLink = styled(Link)`
  position: absolute; /* ArrowIcon을 왼쪽으로 고정 */
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
`;
