import { SearchDetailHeader } from "@/features/search/ui";
import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import StarFilled from "@/shared/assets/search/star.svg?react";
import StarOutlined from "@/shared/assets/search/star_outlined.svg?react";
import { Button } from "@/shared/components/button/Button";
import { useTranslation } from "react-i18next";

function ReviewForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 별점 상태 (1~5). 0이면 아직 선택 안 된 상태
  const [rating, setRating] = useState<number>(0);

  // 별 아이콘을 렌더링하는 헬퍼
  const renderStar = (index: number) => {
    // index는 1부터 시작한다는 가정
    const isFilled = index <= rating;
    const Icon = isFilled ? (
      <StarFilled width="25" height="23" />
    ) : (
      <StarOutlined />
    );

    return (
      <StarButton key={index} onClick={() => setRating(index)}>
        {Icon}
      </StarButton>
    );
  };

  return (
    <Container>
      <SearchDetailHeader>Review</SearchDetailHeader>

      <TitleWrapper>
        <Title>{location.state.name}</Title>
        <Date>{dayjs().format("YYYY-MM-DD")}</Date>
      </TitleWrapper>

      <StarsContainer>
        {[1, 2, 3, 4, 5].map((i) => renderStar(i))}
      </StarsContainer>

      <ReviewTextArea placeholder={t("Please write a review")} />

      <Button onClick={() => navigate("/search")}>Save</Button>
    </Container>
  );
}

export { ReviewForm };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 32px;
`;

const Title = styled.strong`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.colors.black};
`;

const Date = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${theme.colors.gray_7};
  margin-bottom: 16px;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const StarButton = styled.button`
  width: 34px;
  height: 34px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    transition: transform 0.15s ease-in-out;
    &:active {
      transform: scale(1.1);
    }
  }
`;

const ReviewTextArea = styled.textarea`
  width: 328px;
  height: 328px;
  padding: 16px 0 0 16px;
  border: 1px solid ${theme.colors.white_e5};
  border-radius: 10px;
  margin-bottom: 80px;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.colors.black};
  resize: none;

  &::placeholder {
    color: ${theme.colors.gray_7};
  }
`;
