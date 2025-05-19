
import * as S from '../common'
import { StepConditionsProps } from "../../diagnosis.type";
//import { useConditionList } from "../../lib/useConditionList";

export const StepConditions = ({
  data,
  system,
  symptom,
  languageCode,
  onNext,
  onPrev,
  }: StepConditionsProps) => {

   // const { selectedCondition, allCondition, toggleCondition, isLoading } = useConditionList();

    return (
        <div>
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
        </div>
    )
}