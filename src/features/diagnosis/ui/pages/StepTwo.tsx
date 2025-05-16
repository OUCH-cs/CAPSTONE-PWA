import * as S from "../common"
import SymptomsList from "../SymptomsList";
import { StepProps } from "../../diagnosis.type";

const StepTwo = ({ onNext, onPrev }: StepProps) => {

  return (
    <S.Container>
        <S.Question>Where are you feeling uncomfortable?</S.Question>
        <SymptomsList />
        <S.ButtonContainer>
          <S.NavigateButton
            onClick={onPrev}
          >
            <S.ButtonText>Prev</S.ButtonText>
          </S.NavigateButton>
          <S.NavigateButton
            onClick={onNext}
          >
            <S.ButtonText>Next</S.ButtonText>
          </S.NavigateButton>
        </S.ButtonContainer>
    </S.Container>
  );
};

export default StepTwo;
