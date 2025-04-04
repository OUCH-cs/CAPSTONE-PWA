import * as S from '../style'
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { Accordion } from "@/shared/components/accordion";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { useFormContext } from "react-hook-form";
import SelectedSymptoms from "../SelectedSymptoms";
import { StepProps } from "../../diagnosis.type";
import { DURATION_OPTIONS } from "@/shared/mock";


const StepThree = ({ onNext }: StepProps) => {
  const { setValue, watch } = useFormContext<{ duration: string }>();
  const duration: string = watch("duration") || "";

  return (
    <S.Container>
      <S.Question>How long did the symptoms lasted?</S.Question>
      <SelectedSymptoms />
      <Accordion>
        {/* 아코디언 헤더 */}
        <Accordion.Header>
          <AccordionHeaderWrapper>
            {duration ? duration : "Duration of symptoms"}
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
            {DURATION_OPTIONS.map((item)=>(
              <Accordion.Item key={item}>
                <ItemWrapper
                  selected={duration === item}
                  onClick={() => {setValue("duration", item);}}
                  >
                  {item}
                </ItemWrapper>
              </Accordion.Item>
            ))}
          </BodyWrapper>
        </Accordion.Body>
      </Accordion>

      <S.NextButton
        disabled={!duration}
        onClick={onNext}
        style={{ marginTop: "2rem"}}
      >
        <S.NextButtonText>Next</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
};

export default StepThree;



const AccordionHeaderWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  color: ${ theme.colors.gray_7};
  justify-content: space-between;
  align-items: center;
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
  border-radius: 6px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.tertiary : "transparent"};
  border: none;
  text-align: left;
  cursor: pointer;
`;
