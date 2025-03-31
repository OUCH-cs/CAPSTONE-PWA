/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Button } from "@/shared/components/button/Button";
import SelectedSymptoms from "../SelectedSymptoms";
import PainLevelBar from "../PainLevelBar";
import { useNavigate } from "react-router-dom";
import theme from "@/shared/styles/theme";
import { StepProps } from "../../diagnosis.type";

const StepFour = ({ onNext }: StepProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <p css={question}>How severe is the pain?</p>
      <SelectedSymptoms />
      <PainLevelBar />
      <Button css={nextButton} onClick={onNext}>
        <p css={nextButtonText}>Next</p>
      </Button>
      <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
    </Container>
  );
};

export default StepFour;

const Container = styled.div`
  padding-top: 46px;
`;

const question = css`
  font-size: 21px;
  text-align: center;
  margin-bottom: 22px;
`;

const nextButton = css`
  background-color: ${theme.colors.primary};
  padding: 12px 0;
  border-radius: 10px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

const nextButtonText = css`
  color: ${theme.colors.white};
  font-size: 18px;
`;

const BackButton = styled.button`
  margin-top: 16px;
  background: none;
  border: none;
  color: ${theme.colors.gray_7};
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;