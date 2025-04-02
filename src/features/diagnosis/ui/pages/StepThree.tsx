import { useState } from "react";
import * as S from '../style'
import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import theme from "@/shared/styles/theme";
import SelectedSymptoms from "../SelectedSymptoms";
import { StepProps } from "../../diagnosis.type";
import { DURATION_OPTIONS } from "@/shared/mock";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const StepThree = ({ onNext }: StepProps) => {
  const { setValue, watch } = useFormContext<{ duration: string }>();
  const duration: string = watch("duration") || "";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <S.Container>
      <S.Question>How long did the symptoms lasted?</S.Question>
      <SelectedSymptoms />
      <Card>
        <DropdownButton onClick={() => setDropdownOpen((prev) => !prev)}>
          <DropdownText>
            {duration ? duration : "Duration of symptoms"}
          </DropdownText>
          {dropdownOpen ? (
            <IoChevronUp size={20} />
          ) : (
            <IoChevronDown size={20} />
          )}
        </DropdownButton>

        {dropdownOpen && <Divider />}
        {dropdownOpen &&
          DURATION_OPTIONS.map((item) => (
            <DropdownItem
              key={item}
              selected={duration === item}
              onClick={() => {
                setValue("duration", item);
                setDropdownOpen(false);
              }}
            >
              <DropdownItemText>{item}</DropdownItemText>
            </DropdownItem>
          ))}
      </Card>
      <S.NextButton
        disabled={!duration}
        onClick={onNext}
      >
        <S.NextButtonText>Next</S.NextButtonText>
      </S.NextButton>
    </S.Container>
  );
};

export default StepThree;

const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${theme.colors.white_e5};
  padding: 13px 0;
  margin-bottom: 24px;
`;

const DropdownButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 18px;
  background: none;
  border: none;
  cursor: pointer;
`;

const DropdownText = styled.p`
  font-size: 16px;
  color: ${ theme.colors.gray_7};
`;

const DropdownItem = styled.button<{ selected: boolean }>`
  width: 100%;
  height: 56px;
  padding: 13px 18px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.tertiary : "transparent"};
  border: none;
  text-align: left;
  cursor: pointer;
`;

const DropdownItemText = styled.p`
  font-size: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${theme.colors.white_e5};
  margin: 5px -18px;
`;
