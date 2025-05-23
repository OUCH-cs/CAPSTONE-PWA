import * as S from '../common'
import PainLevelBar from "../PainLevelBar";
import { StepProps } from "../../diagnosis.type";

const StepFour = ({ onNext }: StepProps) => {

  return (
    <S.Container>
      <S.Question>How severe is the pain?</S.Question>
      <PainLevelBar />
      <S.NextButton onClick={onNext}>
        <S.NextButtonText>Next</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
};

export default StepFour;
