import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "@/shared/styles/theme";
import PlusButton from "@/shared/assets/diagnosis/PlusButton";
import { Button } from "@/shared/components/button/Button";
import { useSymptomsStore } from "../../service/useDiagnosisStore";
import MinusButton from "@/shared/assets/diagnosis/MinusButton";

interface AddSymptomsProps {
  onClose: () => void;
}

const AddSymptoms = ({ onClose }: AddSymptomsProps) => {
  const [inputText, setInputText] = useState("");
  const { customSymptoms, addSymptom, removeSymptom } = useSymptomsStore();

  const handleAddSymptom = () => {
    if (inputText.trim() && !customSymptoms.includes(inputText)) {
      addSymptom(inputText);
      setInputText("");
    }
  };

  return (
    <Container>
      <InputContainer>
        <StyledInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add symptoms"
        />
        <AddButton onClick={handleAddSymptom}>
          <PlusButton />
        </AddButton>
      </InputContainer>

      <SymptomList>
        {customSymptoms.map((item, index) => (
          <SymptomItem key={index}>
            <p css={symptomText}>{item}</p>
            <RemoveButton onClick={() => removeSymptom(item)}>
              <MinusButton />
            </RemoveButton>
          </SymptomItem>
        ))}
      </SymptomList>
      <CloseButton onClick={onClose}>
        <CloseButtonText>Close</CloseButtonText>
      </CloseButton>
    </Container>
  );
};

export default AddSymptoms;

const Container = styled.div`
  margin-top: -46px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  border: 1px solid ${theme.colors.white_e5};
  border-radius: 10px;
  background-color: ${theme.colors.white};
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid transparent;
  background-color: ${theme.colors.white};
  border-radius: 10px 0 0 10px;
  outline: none;
`;

const AddButton = styled.button`
  padding: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

const SymptomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SymptomItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 10px;
  border: 1px solid ${theme.colors.white_e5};
  background-color: ${theme.colors.white};
  border-radius: 10px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
`;

const symptomText = css`
  font-size: 16px;
`;

const CloseButton = styled(Button)`
  height: 4rem;
  width: 100%;
  margin-top: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButtonText = styled.p`
  color: ${theme.colors.white};
  font-size: 1.5rem;
`
