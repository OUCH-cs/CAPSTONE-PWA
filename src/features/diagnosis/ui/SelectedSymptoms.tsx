/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import theme from "@/shared/styles/theme";

const SelectedSymptoms = () => {
  const { getValues, setValue } = useFormContext<{ symptoms: string[] }>();
  const selectedSymptoms = getValues("symptoms") || [];

  const removeSymptom = (symptom: string) => {
    const updated = selectedSymptoms.filter((s) => s !== symptom);
    setValue("symptoms", updated);
  };

  return (
    <Container>
      <p css={selectedSymptomsLabel}>Selected symptoms</p>
      <SymptomsList>
        {selectedSymptoms.map((item) => (
          <SymptomBadge key={item}>
            <p css={symptomText}>{item}</p>
            <RemoveButton onClick={() => removeSymptom(item)}>✕</RemoveButton>
          </SymptomBadge>
        ))}
      </SymptomsList>
    </Container>
  );
};

export default SelectedSymptoms;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

const selectedSymptomsLabel = {
  fontSize: 16,
  marginLeft: 16,
  marginRight: 12,
};

const SymptomsList = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: center;
  gap: 5px;
`;

const SymptomBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 100px;
  border: 1px solid ${theme.colors.gray_de};
  white-space: nowrap;
`;

const symptomText = {
  fontSize: 12,
  color: theme.colors.gray_4,
  marginRight: 5,
};

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;