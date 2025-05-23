import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { chunkArray } from "@/features/diagnosis/lib/chunkArray";
import { useGuideCategories } from "../lib/useGuide";
import { ITEMS_PER_ROW } from "@/shared/mock";
import Skeleton from "@/shared/components/skeleton/Skeleton";


const GuideCategories = () => {
  const { selectedCategories, allCategories, toggleCategories, isLoading } = useGuideCategories()
  const categories = chunkArray(allCategories, ITEMS_PER_ROW);

  return (
    <Container>
      {isLoading && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={120} height={36} />
          ))}
        </SkeletonList>
      )}
      {!isLoading&&
        categories.map((group, index) => (
          <GuideList key={`group-${index}`}>
            {group.map((item) => (
              <GuideButton
                key={item}
                selected={selectedCategories.includes(item)}
                onClick={() => toggleCategories(item)}
              >
                <GuideText selected={selectedCategories.includes(item)}>
                  {item}
                </GuideText>
              </GuideButton>
            ))}
          </GuideList>
        ))
      }
      
    </Container>
  );
};

export default GuideCategories;

const Container = styled.div`
  margin-bottom:3rem;
`

const GuideList = styled.div`
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

const GuideButton = styled.button<{ selected: boolean }>`
  padding: 0.71rem 1.14rem;
  height: 3.1rem;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.selected ? theme.colors.primary : theme.colors.white_e5};
  background-color: ${(props) =>
    props.selected ? theme.colors.black : theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const GuideText = styled.p<{ selected: boolean }>`
  font-size: 1.4rem;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.gray_7};
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