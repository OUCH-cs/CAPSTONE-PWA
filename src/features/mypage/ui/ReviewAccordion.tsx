import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Accordion } from "@/shared/components/accordion";
import ArrowChevronIcon from "@/shared/assets/common/arrow.svg?react";
import { reviewInformation } from "@/features/mypage/service/MyPageApi";

type ReviewItem = {
  id: number;
  userNickname: string;
  hospitalYkiho: string;
  contents: string;
  score: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export default function ReviewAccordion() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await reviewInformation();
      if (data) {
        setReviews(data);
      }
    };
    fetchReviews();
  }, []);

  return (
    <AccordionContainer>
    <Accordion>
      {reviews.map((review, index) => (
        <div key={review.id}>
          <CreatedAtText>{review.createdAt}</CreatedAtText>
          <AccordionHeaderWrapper
            isExpanded={expandedIndex === index}
            onClick={() =>
              setExpandedIndex((prev) => (prev === index ? null : index))
            }
          >
            <AccordionHeaderTitle>
              {review.hospitalYkiho}
            </AccordionHeaderTitle>
            <StyledArrowIcon
              style={{
                transform: expandedIndex === index ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </AccordionHeaderWrapper>

          {expandedIndex === index && (
            <AccordionBodyWrapper>
              <AccordionItemWrapper>
                {review.contents}
              </AccordionItemWrapper>
            </AccordionBodyWrapper>
          )}
        </div>
      ))}
    </Accordion>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  padding: 0 16px;
`;

const CreatedAtText = styled.div`
  font-size: 14px;
  color:#434343;
  margin-bottom: 8px;
  margin-top:24px;
`;

const AccordionHeaderWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.white_e5};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
  border-bottom: ${({ isExpanded, theme }) => (isExpanded ? "none" : `1px solid ${theme.colors.white_e5}`)};
`;

const AccordionHeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color:#000; 
`;

const AccordionBodyWrapper = styled.div`
  border-radius: 10px;
  background-color: #FFF;
  padding-left: 16px;
  height: 200px;
  paddint-top: 26px;
  border-bottom:1px solid ${({ theme }) => theme.colors.white_e5};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
`;

const AccordionItemWrapper = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.6;
`;

const StyledArrowIcon = styled(ArrowChevronIcon)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.colors.gray_7};
  transition: transform 0.2s ease-in-out;
`;
