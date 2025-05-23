import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { chunkArray } from "../lib/chunkArray";
import { useSystemsList } from "../lib/useSystemList";
import { ITEMS_PER_ROW } from "@/shared/mock";
import Skeleton from "@/shared/components/skeleton/Skeleton";

const SymptomsList = () => {
  const { selectedSystem, allSystems, toggleSystem, isLoading } = useSystemsList();
  const groupedSymptoms = chunkArray(allSystems, ITEMS_PER_ROW);

  return (
    <SymptomsContaniner>
      {isLoading && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={120} height={36} />
          ))}
        </SkeletonList>
      )}
      {!isLoading&&
        groupedSymptoms.map((group, index) => (
          <SymptomList key={`group-${index}`}>
            {group.map((item) => (
              <SymptomButton
                type="button"
                key={item}
                selected={selectedSystem.includes(item)}
                onClick={() => toggleSystem(item)}
              >
                <SymptomText selected={selectedSystem.includes(item)}>
                  {item}
                </SymptomText>
              </SymptomButton>
            ))}
          </SymptomList>
        ))
      }
    </SymptomsContaniner>
  );
};

export default SymptomsList;
const SymptomsContaniner = styled.div`
  margin-bottom: 8rem;

`
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

const SkeletonList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 50px;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;