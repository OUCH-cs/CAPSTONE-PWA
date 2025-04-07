import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { chunkArray } from "../lib/chunkArray";
import { useSymptomsList } from "../lib/useSymptomsList";
import { ITEMS_PER_ROW } from "@/shared/mock";

const SymptomsList = () => {
  const { selectedSymptoms, allSymptoms, toggleSymptom } = useSymptomsList();
  const groupedSymptoms = chunkArray(allSymptoms, ITEMS_PER_ROW);
  

  return (
    <>
      {groupedSymptoms.map((group, index) => (
        <SymptomList key={`group-${index}`}>
          {group.map((item) => (
            <SymptomButton
              key={item}
              selected={selectedSymptoms.includes(item)}
              onClick={() => toggleSymptom(item)}
            >
              <SymptomText selected={selectedSymptoms.includes(item)}>
                {item}
              </SymptomText>
            </SymptomButton>
          ))}
        </SymptomList>
      ))}
    </>
  );
};

export default SymptomsList;

const SymptomList = styled.div`
  display: flex;
  gap: 0.29rem;
  overflow-x: auto;
  margin-top: 1.14rem;
  width: 100%;
  justify-content: flex-start;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
`;

const SymptomButton = styled.button<{ selected: boolean }>`
  padding: 0.71rem 1.14rem;
  height: 3.5rem;
  border-radius: 400px;
  border: 1px solid
    ${(props) =>
      props.selected ? theme.colors.primary : theme.colors.white_e5};
  background-color: ${(props) =>
    props.selected ? theme.colors.tertiary : theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const SymptomText = styled.p<{ selected: boolean }>`
  font-size: 1.4rem;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.gray_7};
`;