/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Button } from "@/shared/components/button/Button";
import theme from "@/shared/styles/theme";
import PlusButton from "@/shared/assets/diagnosis/PlusButton";
import SymptomsList from "../SymptomsList";
import { StepProps } from "../../diagnosis.type";
import { useDiagnosisStore } from "../../service/useDiagnosisStore";
import AddSymptoms from "./AddSymptomsPage";

const StepTwo = ({ onNext }: StepProps) => {
  const { currentPage, setPage } = useDiagnosisStore();

  return (
    <Container>
      {currentPage === "main" ? (
        <>
          <p css={question}>Please select your symptoms</p>
          <SymptomsList />
          <AddButton onClick={() => setPage("add")}>
            <PlusButton />
          </AddButton>
          <Button css={nextButton} onClick={onNext}>
            <p css={nextButtonText}>Next</p>
          </Button>
        </>
      ) : (
        <AddSymptoms onClose={() => setPage("main")} />
      )}
    </Container>
  );
};

export default StepTwo;

const Container = styled.div`
  padding-top: 46px;
`;

const question = css`
  font-size: 21px;
  text-align: center;
  margin-bottom: 33px;
`;

const AddButton = styled.button`
  padding: 32px;
  margin-bottom: 60px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const nextButton = css`
  background-color: ${theme.colors.primary};
  padding: 12px 0;
  border-radius: 10px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const nextButtonText = css`
  color: ${theme.colors.white};
  font-size: 18px;
`;