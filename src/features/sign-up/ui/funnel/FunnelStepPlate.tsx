import styled from "@emotion/styled";
import { Button } from "@/shared/components/button/Button";
import { getFunnelGuideLabel } from "../../lib";

interface FunnelStepPlateProps {
  label: string;
  children: React.ReactNode;
  onNext: () => void;
}

function FunnelStepPlate({ label, children, onNext }: FunnelStepPlateProps) {
  const guideLabel = getFunnelGuideLabel(label);

  return (
    <Container>
      <Label>{guideLabel}</Label>
      <ContentWrapper>{children}</ContentWrapper>
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

const ContentWrapper = styled.div`
  margin-bottom: 66px;
`;
