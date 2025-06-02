import * as S from "../common";
import PainLevelBar from "../PainLevelBar";
import { StepProps } from "../../diagnosis.type";
import { useConditionStep } from "../../lib/useConditionStep";
import { StepConditions } from "./StepConditions";
import { useTranslation } from "react-i18next";

const StepFive = ({ onNext, onPrev }: StepProps) => {
  const { t } = useTranslation();
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
      <S.Question>{t("How severe is the pain?")}</S.Question>
      <PainLevelBar />
      <S.ButtonContainer>
        <S.NavigateButton type="button" variant="prev" onClick={onPrev}>
          <S.ButtonText variant="prev">{t("Prev")}</S.ButtonText>
        </S.NavigateButton>
        <S.NavigateButton type="button" onClick={checkConditionsAndProceed}>
          <S.ButtonText>{t("Next")}</S.ButtonText>
        </S.NavigateButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default StepFive;
