import styled from "@emotion/styled";
import { Button } from "@/shared/components/button/Button";
import { getFunnelGuideLabel } from "../../../features/sign-up/lib";

interface FunnelStepPlateProps {
  label?: string;
  children: React.ReactNode;
  margin?: number;
  onNext: () => void;
}

/**
 * FunnelStepPlate 컴포넌트는 각 단계별로 표시되는 콘텐츠와 버튼을 감싸는 컨테이너입니다.
 *
 * @component
 *
 * @param {string} [label] - 단계별 가이드를 표시하기 위한 라벨 값 [선택사항]
 * @param {ReactNode} children - 단계별로 표시될 콘텐츠를 렌더링하는 자식 요소
 * @param {number} [margin=66] - 콘텐츠와 버튼 사이의 간격을 조정하는 마진 값 [선택사항]
 * @param {() => void} onNext - "Next" 버튼 클릭 시 호출되는 콜백 함수
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
  margin = 66,
  onNext,
}: FunnelStepPlateProps) {
  // 라벨 값이 있을 때만 렌더링
  let guideLabel;
  if (label) {
    guideLabel = getFunnelGuideLabel(label);
  }

  return (
    <Container>
      {label && <Label>{guideLabel}</Label>}
      <ContentWrapper $margin={margin}>{children}</ContentWrapper>
      <Button onClick={onNext}>Next</Button>
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

const ContentWrapper = styled.div<{ $margin: number }>`
  margin-bottom: ${({ $margin }) => $margin}px;
`;
