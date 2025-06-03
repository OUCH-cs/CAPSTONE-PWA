import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import theme from "@/shared/styles/theme";
import { Button } from "@/shared/components/button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans} from "react-i18next";
import ErrorIcon from "@/shared/assets/common/error.svg?react";

function CommingSoonPage() {
const navigate = useNavigate() ;
const {t} = useTranslation()
  
  return (
    <Container>
      <Question>
        <Trans i18nKey="commingsoon"/>
      </Question>
      <IconContainer>
        <ErrorIcon width="100" height="100"/>
      </IconContainer>
      <ButtonGroup>
        <FinishButton onClick={()=>{navigate('/')}}>{t("commingback")}</FinishButton>
      </ButtonGroup>
    </Container>
  );
};

export { CommingSoonPage };
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Question = styled.p`
  margin-top: 4.5rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  white-space: pre-line;
  font-weight: 600;
`;

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 16px;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
  margin-bottom: 6.3rem;
`;

const FinishButton = styled(Button)`
  width: 100%;
  font-weight: 500;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
