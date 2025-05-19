import * as S from '../common'
import PainLevelBar from "../PainLevelBar";
import { StepProps } from "../../diagnosis.type";
import { useConditionStep } from '../../lib/useConditionStep';
import { StepConditions } from './StepConditions';

const StepFive = ({ onNext, onPrev }: StepProps) => {
  const {
    showConditions,
    conditionData,
    system,
    symptom,
    languageCode,
    checkConditionsAndProceed,
    setShowConditions,
  } = useConditionStep(onNext);

  if (showConditions && conditionData) {
    return (
      <StepConditions
        data={conditionData}
        system={system}
        symptom={symptom}
        languageCode={languageCode}
        onNext={onNext}
        onPrev={() => setShowConditions(false)}
      />
    );
  }
  
  return (
    <S.Container>
      <S.Question>How severe is the pain?</S.Question>
      <PainLevelBar />
          <S.ButtonContainer>
            <S.NavigateButton
              onClick={onPrev}
            >
              <S.ButtonText>Prev</S.ButtonText>
            </S.NavigateButton>
            <S.NavigateButton
              onClick={checkConditionsAndProceed}
            >
              <S.ButtonText>Next</S.ButtonText>
            </S.NavigateButton>
          </S.ButtonContainer>
    </S.Container>
  );
};

export default StepFive;
