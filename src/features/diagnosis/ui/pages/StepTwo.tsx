import * as S from "../common"
import styled from "@emotion/styled";
import PlusButton from "@/shared/assets/diagnosis/PlusButton.svg?react";
import SymptomsList from "../SymptomsList";
import { StepProps } from "../../diagnosis.type";
import { useAtom } from "jotai";
import { currentPageAtom, setPageAtom } from "../../service/selfDiagnosisAtoms";
import AddSymptoms from "./AddSymptomsPage";

const StepTwo = ({ onNext }: StepProps) => {
  const [currentPage] = useAtom(currentPageAtom);
  const [, setPage] = useAtom(setPageAtom);

  return (
    <S.Container>
      {currentPage === "main" ? (
        <>
          <S.Question>Please select your symptoms</S.Question>
          <SymptomsList />
          <AddButton onClick={() => setPage("add")}>
            <PlusButton width={16} height={16}/>
          </AddButton>
          <S.NextButton onClick={onNext}>
            <S.NextButtonText>Next</S.NextButtonText>
          </S.NextButton>
        </>
      ) : (
        <AddSymptoms onClose={() => setPage("main")} />
      )}
    </S.Container>
  );
};

export default StepTwo;

const AddButton = styled.div`
  padding: 2.3rem;        
  margin-bottom: 4.3rem;  
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
