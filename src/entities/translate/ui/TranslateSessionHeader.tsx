import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";

export default function TranslateSessionHeader({
  finishModalToggle,
}: {
  finishModalToggle: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Container>
      <ProfileWrapper>
        <Profile />

        <InfoWrapper>
          <Title>Doctor</Title>
          <Interpretation>
            <StatusDot />
            interpretation
          </Interpretation>
        </InfoWrapper>
      </ProfileWrapper>

      <FinishButton onClick={finishModalToggle}>{t("Finish")}</FinishButton>
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 15px;
  background-color: ${theme.colors.white};
  opacity: 0.9;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.black};
`;

const Interpretation = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.colors.gray_4};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
`;

const FinishButton = styled.button`
  width: 72px;
  height: 38px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 400;
  color: white;
  background-color: ${theme.colors.primary};
`;
