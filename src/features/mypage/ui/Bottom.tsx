import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import { useTranslation } from "react-i18next";
import { useSetAtom } from "jotai";
import { isAuthAtom } from "@/features/sign-in/services/atoms";
import { useNavigate } from "react-router-dom";

const Bottom = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const setIsAuth = useSetAtom(isAuthAtom);

  const handleLogout = () => {
    setIsAuth(false);
    navigate("/sign-in");
  };

  return (
    <Header>
      <Section>
        <TitleText>{t("Notice")}</TitleText>
        <StyledArrowIcon width="20px" height="20px" />
      </Section>
      <Section>
        <TitleText>{t("Feedback")}</TitleText>
        <StyledArrowIcon width="20px" height="20px" />
      </Section>
      <Section>
        <TitleText>{t("Customer Service")}</TitleText>
        <StyledArrowIcon width="20px" height="20px" />
      </Section>
      <Section>
        <LogoutButton onClick={handleLogout}>{t("Log out")}</LogoutButton>
      </Section>
    </Header>
  );
};

export default Bottom;

const Header = styled.div`
  margin-top: 20px;
  border-radius: 20px 20px 0px 0px;
  background-color: #fff;
  box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-height: 52vh;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const TitleText = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin-top: 24px;
  margin-bottom: 12px;
  margin-left: 16px;
  white-space: nowrap;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  stroke: #767676;
  margin-top: 24px;
  margin-bottom: 12px;
  transform: rotate(180deg);
  margin-right: 16px;
`;

const LogoutButton = styled.button`
  margin-top: 25px;
  margin-left: 16px;
  cursor: pointer;
  font-size: 16px;
  color: #dc0000;
  padding: 0;
  background-color: transparent;
`;
