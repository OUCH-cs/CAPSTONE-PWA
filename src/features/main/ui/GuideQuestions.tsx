import styled from "@emotion/styled";
import { Accordion } from "@/shared/components/accordion";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";
import { useAtom } from "jotai";
import { selectedCategoriesAtom } from "../service/guideAtoms";
import { useGetGuideQustion } from "../lib/useGuideCategories";


function GuideQuestions() {
    const [selectedCategories] = useAtom(selectedCategoriesAtom);
    const selectedCategory = selectedCategories || ""; // 첫 번째 선택된 카테고리
  
    const { data = [], isLoading } = useGetGuideQustion(selectedCategory, "en");
    
    if (isLoading) {
        return <div>Loading guide questions...</div>;
      }

    return (
        <Container>
          {/* 아코디언 루트 컨테이너 */}
          {data.map((item, idx) => (
            <Accordion key={`${item.question.en}-${idx}`}>
            <Accordion.Header>
                <AccordionHeaderWrapper>
                    {`Q. ${item.question.en}`}
                <Accordion.Trigger>
                    <ArrowIcon />
                </Accordion.Trigger>
                </AccordionHeaderWrapper>
            </Accordion.Header>
            <Accordion.Body>
                <BodyWrapper>
                <Accordion.Item>
                    <ItemWrapper>
                        <Text>{`A. ${item.answer.en}`}</Text>
                    </ItemWrapper>
                </Accordion.Item>
                </BodyWrapper>
            </Accordion.Body>
            </Accordion>
            ))}
        </Container>
      );
    }

export {GuideQuestions}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${theme.colors.background};
  overflow-y: auto;
  padding-bottom: 8rem;

`;

const AccordionHeaderWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  height: 63px;
  padding: 9px 15px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
`;

const BodyWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.white_f1};
  flex-direction: column;
  border-radius: 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 18px;
  gap:10px;
  flex-direction: column;
  border-radius: 6px;
  border: none;
  text-align: left;
  cursor: pointer;
  white-space: pre-line;
`;
const Text = styled.p`
  margin-bottom:10px;
  font-size: 16px;
  font-weight: 600;
`;
