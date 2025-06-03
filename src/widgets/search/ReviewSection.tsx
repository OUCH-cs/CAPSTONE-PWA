import { FloatingButton } from "@/shared/components/button/FloatingButton";
import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import PlusIcon from "@/shared/assets/search/plus.svg?react";
import { useNavigate } from "react-router-dom";
import { SearchDetailResponse } from "@/features/search/types/search.types";
import useSWR from "swr";
import { getReviews } from "@/features/search/services/api/searcApi";
import { Accordion } from "@/shared/components/accordion";
import ArrowChevronIcon from "@/shared/assets/common/arrow.svg?react";
import ProfileImg from "@/shared/assets/mypage/profile.svg?react";
import RatingStar from "@/shared/assets/search/star.svg?react";
import { useEffect } from "react";
import Skeleton from "@/shared/components/skeleton/Skeleton";

export default function ReviewSection({
  data,
}: {
  data: SearchDetailResponse;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: reviews,
  } = useSWR(`/reviews/hospitals/${data.ykiho}`, getReviews, {
    dedupingInterval: 1000 * 60 * 60, // 1시간
  });

  useEffect(() => {
    // 에러 예외 처리
    if (error) {
      alert(t("An error occurred while fetching the reviews."));
    }
  });

  // 플로팅 버튼 클릭 시 리뷰 작성 페이지로 라우팅
  const handleRoutingReviewForm = () => {
    navigate(`/review`, {
      state: { data },
    });
  };

  return (
    <>
      <Container>
        {reviews?.length === 0 && <None>{t("No reviews available yet.")}</None>}

        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} width={312} height={48} />
          ))}

        <ReviewList>
          {reviews?.map((review) => (
            <Accordion key={review.id}>
              <Accordion.Header>
                <AccordionHeaderWrapper>
                  <ProfileInfoWrapper>
                    <ProfileImg width="48" height="48" />

                    <HeaderContents>
                      <AccordionHeaderTitle>
                        {review.userNickname}
                      </AccordionHeaderTitle>

                      <Metrics>
                        <RatingWrapper>
                          <RatingStar />
                          <Rating>{review.score}</Rating>
                        </RatingWrapper>
                        <Date>{review.createdAt}</Date>
                      </Metrics>
                    </HeaderContents>
                  </ProfileInfoWrapper>

                  <Accordion.Trigger>
                    <StyledArrowChevronIcon
                      width={20}
                      height={20}
                      stroke="#000"
                    />
                  </Accordion.Trigger>
                </AccordionHeaderWrapper>
              </Accordion.Header>

              <Accordion.Body>
                <AccordionBodyWrapper>{review.contents}</AccordionBodyWrapper>
              </Accordion.Body>
            </Accordion>
          ))}
        </ReviewList>
      </Container>

      <FloatingButton
        width="40px"
        height="40px"
        borderRadius="100px"
        icon={<PlusIcon />}
        onClick={handleRoutingReviewForm}
      />
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const None = styled.p`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.gray_7};
  text-align: center;
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 33px;
  width: 312px;
  overflow-y: auto;
`;

const AccordionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 18px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AccordionHeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.black};
`;

const Metrics = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RatingWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Rating = styled.span`
  color: #fdcf18;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.gray_7};
`;

const StyledArrowChevronIcon = styled(ArrowChevronIcon)`
  width: 24px;
  height: 24px;
`;

const AccordionBodyWrapper = styled.div`
  height: fit-content;
  padding: 16px 25px 25px 25px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  overflow-y: auto;
`;
