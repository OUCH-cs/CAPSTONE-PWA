import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { SelectDestinationProps, DestinationType } from "../diagnosis.type";
import { useFormContext } from "react-hook-form";
import { useAtom } from "jotai";
import { destinationAtom } from "../service/selfDiagnosisAtoms";

const SelectDestination = ({ selectedDestination }: SelectDestinationProps) => {
  const { setValue } = useFormContext<{ visitType: DestinationType }>();
  const [, setDestination] = useAtom(destinationAtom);

  return (
    <ButtonContainer>
      <OptionButton
        selected={selectedDestination === "HOSPITAL"}
        onClick={() => {
          setValue("visitType", "HOSPITAL");
          setDestination("HOSPITAL");
        }}
      >
        <OptionText selected={selectedDestination === "HOSPITAL"}>
          Hospital
        </OptionText>
      </OptionButton>

      <OptionButton
        selected={selectedDestination === "PHARMACY"}
        onClick={() => {
          setValue("visitType", "PHARMACY");
          setDestination("PHARMACY");
        }}
      >
        <OptionText selected={selectedDestination === "PHARMACY"}>
          Pharmacy
        </OptionText>
      </OptionButton>
    </ButtonContainer>
  );
};

export default SelectDestination;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.3rem; 
`;

const OptionButton = styled.button<{ selected: boolean }>`
  flex: 1;
  height: 5rem;
  border-radius: 10px;
  border: 1.5px solid
    ${(props) =>
      props.selected ? theme.colors.primary : theme.colors.white_e5};
  background-color: ${(props) =>
    props.selected ? theme.colors.tertiary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionText = styled.p<{ selected: boolean }>`
  font-size: 1.5rem;
  color: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.gray_7};
`;