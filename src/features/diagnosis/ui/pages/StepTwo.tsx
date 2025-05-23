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
            type='button'
            variant = "prev"
            onClick={onPrev}
          >
            <S.ButtonText variant = "prev">Prev</S.ButtonText>
          </S.NavigateButton>
          <S.NavigateButton
            type='button'
            onClick={onNext}
          >
            <S.ButtonText>Next</S.ButtonText>
          </S.NavigateButton>
        </S.ButtonContainer>
    </S.Container>
  );
};

export default StepTwo;