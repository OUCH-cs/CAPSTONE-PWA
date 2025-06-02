import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { useGuideCategories } from "../lib/useGuide";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import Arrow from"@/shared/assets/common/arrow.svg?react";
import { useState } from "react";

const GuideCategories = () => {
  const { selectedCategories, allCategories, toggleCategories, isLoading } = useGuideCategories()
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev); // true <-> false 토글
  };

  return (
    <Container>
      {isLoading && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={120} height={36} />
          ))}
        </SkeletonList>
      )}
      <GuideContainer isOpen={isOpen}>   
        {!isLoading&&
            <GuideList isOpen={isOpen} key={`group`}>
              {allCategories.map((item) => (
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
        }
        <IconBox isOpen={isOpen} onClick={handleClick}>
          <Arrow/>
        </IconBox>
        
      </GuideContainer>
      
    </Container>
  );
};

export default GuideCategories;

const Container = styled.div`
  margin-bottom:1rem;
`

const GuideContainer = styled.div<{isOpen: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
   margin-bottom:1.5rem;
  padding-bottom:10px;
  border-bottom: ${(props) =>
    props.isOpen ? `1px solid ${theme.colors.white_e5}` : 'none'};
  gap:5px;
`

const GuideList = styled.div<{isOpen: boolean}>`
  display: flex;  
  gap: 0.29rem;
  overflow-x: auto;
  transition: max-height 0.4s ease;
  width: 100%;
  justify-content: flex-start;
  transition: max-height 0.8s ease;
  max-height: ${(props) => (props.isOpen ? "35rem" : "5rem")};
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
  flex-wrap: ${(props) => (props.isOpen ? 'wrap' : 'nowrap')};
`;

const GuideButton = styled.button<{ selected: boolean }>`
  padding: 0.71rem 1.14rem;
  margin-bottom:6px;
  height: 3.1rem;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.selected ? theme.colors.black : theme.colors.white_e5};
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

const IconBox = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  align-self: flex-end;
  padding: 1.4rem 0;
  transition: transform 0.6s ease;
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});

`

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