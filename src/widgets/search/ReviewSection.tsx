import { FloatingButton } from "@/shared/components/button/FloatingButton";
import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import PlusIcon from "@/shared/assets/search/plus.svg?react";
import { useNavigate } from "react-router-dom";

export default function ReviewSection({ name }: { name: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRoutingReviewForm = () => {
    navigate(`/review`, {
      state: { name },
    });
  };

  return (
    <>
      <Container>
        <None>{t("No reviews available yet.")}</None>
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const None = styled.p`
  width: 250px;
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.gray_7};
  text-align: center;
`;
