import * as S from '../common'
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { useState } from 'react';
import { Accordion } from "@/shared/components/accordion";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { useFormContext } from "react-hook-form";
import { StepProps } from "../../diagnosis.type";
import { DURATION_OPTIONS, DURATION_LABELS} from "@/shared/mock";
import { useTranslation } from "react-i18next";

const StepFour = ({ onNext, onPrev }: StepProps) => {
  const {t} = useTranslation()
  const { setValue, getValues } = useFormContext<{ duration: string }>();
  const [duration, setDuration] = useState(() => getValues("duration") || "");

  const toogleDuration = (value: string) => {
    setValue("duration", value);
    setDuration(value);          
  };


  return (
    <S.Container>
      <S.Question>{t("How long did the symptoms lasted?")}</S.Question>
      <AccordionContaniner>
        <Accordion>
          {/* 아코디언 헤더 */}
          <Accordion.Header>
            <AccordionHeaderWrapper selected={!duration.length}>
              {duration.length ? DURATION_LABELS[duration] : t("Duration of symptoms")}
              {/* 아코디언 아이콘 컨테이너 */}
              <Accordion.Trigger>
                <ArrowIcon stroke="#000"/>
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
                    onClick={() => {toogleDuration(item)}}
                    >
                    {DURATION_LABELS[item]}
                  </ItemWrapper>
                </Accordion.Item>
              ))}
            </BodyWrapper>
          </Accordion.Body>
        </Accordion>
      </AccordionContaniner>
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
                disabled={!duration}
                onClick={onNext}
              >
                <S.ButtonText>Next</S.ButtonText>
              </S.NavigateButton>
            </S.ButtonContainer>
    </S.Container>
  );
};

export default StepFour;

const AccordionContaniner = styled.div`
  margin-bottom: 3rem;
`
const AccordionHeaderWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  background-color: ${theme.colors.white};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.gray_7 : theme.colors.black};
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  width: inherit;
  height: 60px;
  padding: 9px 15px;
  border: 1px solid ${theme.colors.white_e5};
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