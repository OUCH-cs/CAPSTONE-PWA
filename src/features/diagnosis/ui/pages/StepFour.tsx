import * as S from '../common'
import SelectedSymptoms from "../SelectedSymptoms";
import PainLevelBar from "../PainLevelBar";
import { StepProps } from "../../diagnosis.type";

const StepFour = ({ onNext, onPrev }: StepProps) => {

  return (
    <S.Container>
      <S.Question>How severe is the pain?</S.Question>
      <SelectedSymptoms />
      <PainLevelBar />
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

export default StepFour;
