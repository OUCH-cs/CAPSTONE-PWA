/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/components/button/Button";
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
    <Container>
      <p css={question}>How long did the symptoms lasted?</p>
      <SelectedSymptoms />

      <Card>
        <DropdownButton onClick={() => setDropdownOpen((prev) => !prev)}>
          <p css={dropdownText}>
            {duration ? duration : "Duration of symptoms"}
          </p>
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
              <p css={dropdownItemText}>{item}</p>
            </DropdownItem>
          ))}
      </Card>

      <Button css={nextButton} disabled={!duration} onClick={onNext}>
        <p css={nextButtonText}>Next</p>
      </Button>
    </Container>
  );
};

export default StepThree;

const Container = styled.div`
  padding-top: 46px;
`;

const question = css`
  font-size: 21px;
  text-align: center;
  margin-bottom: 22px;
`;

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

const dropdownText = css`
  font-size: 16px;
  color: ${theme.colors.gray_7};
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

const dropdownItemText = css`
  font-size: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${theme.colors.white_e5};
  margin: 5px -18px;
`;

const nextButton = css`
  backgroundColor: theme.colors.primary,
  padding: "12px 0",
  borderRadius: 10,
  height: 48,
  width: "100%",
  marginTop: 20,
  textAlign: "center" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
`;

const nextButtonText = css`
  color: ${theme.colors.white};
  font-size: 18px;
`;