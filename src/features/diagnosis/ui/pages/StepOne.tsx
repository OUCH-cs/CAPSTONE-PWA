/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import theme from "@/shared/styles/theme";
import { Button } from "@/shared/components/button/Button";
import SelectDestination from "./SelectDestination";
import { useFormContext } from "react-hook-form";
import { DestinationType, StepProps } from "../../diagnosis.type";

const StepOne = ({ onNext }: StepProps) => {
  const { watch } = useFormContext<{ visitType: DestinationType }>();
  const selectedDestination = watch("visitType") ?? undefined;
  const navigate = useNavigate();

  return (
    <Container>
      <p css={question}>Where do you want to go?</p>
      <SelectDestination selectedDestination={selectedDestination} />
      <Button
        css={nextButton}
        disabled={!selectedDestination}
        onClick={onNext}
      >
        <p css={nextButtonText}>Next</p>
      </Button>
      <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
    </Container>
  );
};

export default StepOne;

const Container = styled.div`
  padding-top: 46px;
`;

const question = {
  fontSize: 21,
  textAlign: "center" as const,
  marginBottom: 49,
};

const nextButton = {
  backgroundColor: theme.colors.primary,
  padding: "12px 0",
  borderRadius: 10,
  height: 48,
  width: "100%",
  marginTop: 20,
  textAlign: "center" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const nextButtonText = {
  color: theme.colors.white,
  fontSize: 18,
};

const BackButton = styled.button`
  margin-top: 16px;
  background: none;
  border: none;
  color: ${theme.colors.gray_7};
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;