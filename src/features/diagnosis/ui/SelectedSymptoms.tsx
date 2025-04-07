import styled from "@emotion/styled";
import { useSelectedSymptoms } from "../lib/useSelectedSymptoms";
import theme from "@/shared/styles/theme";

const SelectedSymptoms = () => {
  const { selectedSymptoms, removeSymptom } = useSelectedSymptoms();

  return (
    <Container>
      <SelectedSymptomsLabel>Selected symptoms</SelectedSymptomsLabel>
      <SymptomsList>
        {selectedSymptoms.map((item) => (
          <SymptomBadge key={item}>
            <SymptomText>{item}</SymptomText>
            <RemoveButton onClick={() => removeSymptom(item)}>✕</RemoveButton>
          </SymptomBadge>
        ))}
      </SymptomsList>
    </Container>
  );
};

export default SelectedSymptoms;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  height:2.5rem;
  margin-bottom: 1.125rem;
`;

const SelectedSymptomsLabel = styled.p`
  font-size: 1.4rem; 
  margin-left: 1rem; 
  margin-right: 0.75rem; 
  white-space: nowrap;
`;

const SymptomsList = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: center;
  gap: 0.3125rem; /* 5px */

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none; /* Firefox */
`;

const SymptomBadge = styled.div`
  display: flex;
  align-items: center;
  height:2.5rem;
  padding: 0.375rem 0.31rem 0.375rem 0.75rem;
  border-radius: 100px;
  border: 1px solid ${theme.colors.gray_de};
  white-space: nowrap;
`;

const SymptomText = styled.p`
  font-size: 1rem; /
  color: ${theme.colors.gray_4};
  margin-right: 0.31rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
`;