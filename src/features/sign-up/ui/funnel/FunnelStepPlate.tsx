import styled from "@emotion/styled";
import { Button } from "@/shared/components/button/Button";
import { getFunnelGuideLabel } from "../../lib";
import { FunnelStepPlateProps } from "../../sign-up.types";
import { useFormContext } from "react-hook-form";

/**
 * FunnelStepPlate 컴포넌트는 각 단계별로 표시되는 콘텐츠와 버튼을 감싸는 컨테이너입니다.
 *
 * @component
 *
 * @param {string} label - 단계별 가이드를 표시하기 위한 라벨 값 [선택사항]
 * @param {ReactNode} children - 단계별로 표시될 콘텐츠를 렌더링하는 자식 요소
 * @param {() => void} onNext - "Next" 버튼 클릭 시 호출되는 콜백 함수
 * @param {FieldErrors} errors - 각 필드의 유효성 검사 에러 객체
 *
 *
 * @example
 *
 * ```tsx
 * <FunnelStepPlate
 *   label="name"
 *   margin={50}
 *   onNext={() => setStep(steps[1])}
 * >
 *   <InputField placeholder="Enter your name" />
 * </FunnelStepPlate>
 * ```
 */

function FunnelStepPlate({
  label,
  children,
  onNext,
  value,
}: FunnelStepPlateProps) {
  const guideLabel = getFunnelGuideLabel(label); // 단계별 가이드 레이블 가져오기
  const { trigger } = useFormContext();

  const isStringValid = typeof value === "string" && value.trim().length > 0; // 입력 중인지 확인
  const isNumberValid =
    typeof value === "number" && label === "nationId" && value >= 0; // 숫자형 필드 유효성 검사

  const isValid = isStringValid || isNumberValid;

  const handleNextClick = async () => {
    const isFieldValid = await trigger(label); // 현재 필드 유효성 검사
    if (isFieldValid) onNext(); // 버튼 클릭 시 에러가 없을 때만 다음 스텝으로
  };

  return (
    <Container>
      {label && <Label>{guideLabel}</Label>}
      <ContentWrapper>{children}</ContentWrapper>
      <Button onClick={handleNextClick} disabled={!isValid}>
        Next
      </Button>
    </Container>
  );
}

export { FunnelStepPlate };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 49px;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const ContentWrapper = styled.div`
  margin-bottom: 66px;
`;
