import * as S from "../common";
import SymptomsList from "../SymptomsList";
import { StepProps } from "../../diagnosis.type";
import { useTranslation } from "react-i18next";

const StepTwo = ({ onNext, onPrev }: StepProps) => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Question>{t("Where are you feeling uncomfortable?")}</S.Question>
      <SymptomsList />
      <S.ButtonContainer>
        <S.NavigateButton type="button" variant="prev" onClick={onPrev}>
          <S.ButtonText variant="prev">{t("Prev")}</S.ButtonText>
        </S.NavigateButton>
        <S.NavigateButton type="button" onClick={onNext}>
          <S.ButtonText>{t("Next")}</S.ButtonText>
        </S.NavigateButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default StepTwo;
