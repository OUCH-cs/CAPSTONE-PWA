import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "@/shared/styles/theme";
import { SelectDestinationProps, DestinationType } from "../diagnosis.type";
import { useFormContext } from "react-hook-form";

const SelectDestination = ({ selectedDestination }: SelectDestinationProps) => {
  const { setValue } = useFormContext<{ visitType: DestinationType }>();

  return (
    <ButtonContainer>
      <OptionButton
        selected={selectedDestination === "HOSPITAL"}
        onClick={() => setValue("visitType", "HOSPITAL")}
      >
        <p css={[optionText, selectedDestination === "HOSPITAL" && selectedText]}>
          Hospital
        </p>
      </OptionButton>

      <OptionButton
        selected={selectedDestination === "PHARMACY"}
        onClick={() => setValue("visitType", "PHARMACY")}
      >
        <p css={[optionText, selectedDestination === "PHARMACY" && selectedText]}>
          Pharmacy
        </p>
      </OptionButton>
    </ButtonContainer>
  );
};

export default SelectDestination;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  flex: 1;
  height: 56px;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.selected ? theme.colors.primary : theme.colors.white_e5};
  background-color: ${(props) =>
    props.selected ? theme.colors.tertiary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const optionText = css`
  font-size: 17px;
  color: ${theme.colors.gray_7};
`;

const selectedText = css`
  color: ${theme.colors.primary};
`;