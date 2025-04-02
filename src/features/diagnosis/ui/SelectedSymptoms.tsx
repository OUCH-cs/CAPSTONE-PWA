import styled from "@emotion/styled";
import { css } from "@emotion/react";
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

const selectedSymptomsLabel = css`
  font-size: 16px;
  margin-left: 16px;
  margin-right: 12px;
  white-space: nowrap;
`;

const SymptomsList = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: center;
  gap: 5px;
    /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Firefox용 */
  scrollbar-width: none;
`;

const SymptomBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 5px 6px 12px;
  border-radius: 100px;
  border: 1px solid ${theme.colors.gray_de};
  white-space: nowrap;
`;

const symptomText = css`
  font-size: 12px;
  color: ${theme.colors.gray_4};
  margin-right: 5px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
`;