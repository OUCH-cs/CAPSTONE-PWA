import styled from "@emotion/styled";
import * as S from '../common'
import { StepConditionsProps } from "../../diagnosis.type";
import { useConditionList } from "../../lib/useConditionList";
import theme from "@/shared/styles/theme";


export const StepConditions = ({
  system,
  symptom,
  languageCode,
  onNext,
  onPrev,
  }: StepConditionsProps) => {

    const { selectedCondition, allConditions, toggleCondition, } = useConditionList({system, symptom,languageCode});

    return (
        <S.Container>
            <S.Question>When or how dose this symptom appear?</S.Question>
            <ConditionContaniner>
              {allConditions.map((item)=>(
                <ConditionItem
                type="button"
                key={item}
                onClick={() =>{toggleCondition(item)}} 
                selected={selectedCondition !== null && selectedCondition.includes(item)}
                >
                  <ConditionText selected={selectedCondition !== null && selectedCondition.includes(item)}>
                  {item}
                  </ConditionText>
                </ConditionItem>
              ))}
            </ConditionContaniner>
            <S.ButtonContainer>
              <S.NavigateButton
                variant = "prev"
                onClick={onPrev}
              >
                <S.ButtonText variant = "prev">Prev</S.ButtonText>
              </S.NavigateButton>
              <S.NavigateButton
                onClick={onNext}
              >
                <S.ButtonText>Next</S.ButtonText>
              </S.NavigateButton>
            </S.ButtonContainer>
        </S.Container>
    )
}

const ConditionContaniner = styled.div`
  margin-bottom: 3rem;
  margin-top:4rem;

`
const ConditionItem = styled.button<{ selected: boolean }>`
padding: 0.71rem 1.14rem;
height: 3.5rem;
border-radius: 12px;
width: 100%;
margin-bottom:10px;
  ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.white_e5};
background-color: ${(props) =>
  props.selected ? theme.colors.tertiary : theme.colors.white};
display: flex;
align-items: center;
justify-content: center;
white-space: nowrap;
`;

const ConditionText = styled.p<{ selected: boolean }>`
  font-size: 1.4rem;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.gray_7};
`;