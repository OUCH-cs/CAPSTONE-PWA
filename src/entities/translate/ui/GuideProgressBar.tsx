import styled from "@emotion/styled";
import { LocalizedText } from "@/features/translate/translate.types";
import theme from "@/shared/styles/theme";
import { useTranslation } from "react-i18next";

export default function GuideProgressBar({
  currentStep,
  title,
}: {
  currentStep: string;
  title: LocalizedText;
}) {
  const { i18n } = useTranslation();
  const languageCode = i18n.language as keyof LocalizedText;

  const progressWidth = (Number(currentStep) / 5) * 250; // 프로그래스바 전체 너비(250px)에서 현재 스텝에 따라 너비를 계산.

  return (
    <Container>
      <Title>{title[languageCode]}</Title>

      <ProgressWrapper>
        <Progress $progressWidth={progressWidth} />
      </ProgressWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  height: 31px;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: #000000;
`;

const ProgressWrapper = styled.div`
  width: 250px;
  height: 8px;
  border-radius: 100px;
  background-color: ${theme.colors.white};
`;

const Progress = styled.div<{ $progressWidth: number }>`
  width: ${({ $progressWidth }) => $progressWidth}px;
  height: 100%;
  border-radius: 100px;
  background-color: ${theme.colors.secondary};
  transition: width 0.3s ease-in-out;
`;
