import * as S from '../common'
import styled from "@emotion/styled";
import theme from '@/shared/styles/theme';
import { Accordion } from "@/shared/components/accordion";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import {  StepProps } from "../../diagnosis.type";
import { useSymptoms } from '../../lib/useSymptoms';
import { useFormContext } from "react-hook-form";


const StepThree = ({ onNext, onPrev }: StepProps) => {
   const { setValue, getValues } = useFormContext<{ systems: string; symptoms: string[]}>();
   
   const selectedSystem = getValues("systems");           
   const selectedSymptoms = getValues("symptoms");        
   const { symptoms = [] } = useSymptoms(selectedSystem);

   const toggleSymptom = (symptom: string) => {
    const isSelected = selectedSymptoms.includes(symptom);
    const updated = isSelected
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];

    setValue("symptoms", updated);
  };
  return (
    <S.Container>
      <S.Question>What symptom are you experiencing?</S.Question>
      <AccordionContaniner>
        <Accordion>
          {/* 아코디언 헤더 */}
          <Accordion.Header>
            <AccordionHeaderWrapper>
              {selectedSystem?.length ? selectedSystem: "symptoms"}
              {/* 아코디언 아이콘 컨테이너 */}
              <Accordion.Trigger>
                <ArrowIcon />
              </Accordion.Trigger>
            </AccordionHeaderWrapper>
          </Accordion.Header>
          {/* 아코디언 콘텐츠 */}
          <Accordion.Body>
            {/* 아코디언 콘텐츠 */}
            {/* 리렌더링 되고 있다. */}
            <BodyWrapper>
              {symptoms.map((item)=>(
                <div key={item}>
                  <ItemWrapper
                    selected={selectedSymptoms.includes(item)}
                    onClick={() => toggleSymptom(item)}
                    >
                    {item}
                  </ItemWrapper>
                </div>
              ))}
            </BodyWrapper>
          </Accordion.Body>
        </Accordion>        
      </AccordionContaniner>
      
      <S.ButtonContainer>
        <S.NavigateButton
          onClick={onPrev}
        >
          <S.ButtonText>Prev</S.ButtonText>
        </S.NavigateButton>
        <S.NavigateButton
          disabled={!selectedSymptoms}
          onClick={onNext}
        >
          <S.ButtonText>Next</S.ButtonText>
        </S.NavigateButton>
      </S.ButtonContainer>
    </S.Container>

  );
};

export default StepThree;
const AccordionContaniner = styled.div`
  margin-bottom: 8rem;
`

const AccordionHeaderWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  color: ${ theme.colors.gray_7};
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  width: inherit;
  height: 60px;
  padding: 9px 15px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
`;

const BodyWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  flex-direction: column;
  border-radius: 6px;
`;

const ItemWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 18px;
  align-items: center; 
  font-size: 1.1rem;
  border-radius: 6px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.tertiary : "transparent"};
  border: none;
  text-align: left;
  cursor: pointer;
`;
