import styled from "@emotion/styled";
import { Header, SignupFunnel } from "@/features/sign-up/ui";
import { useFunnel } from "@/shared/lib/funnel";
import { STEPS } from "@/features/sign-up/sign-up.constants";

function SignUpPage() {
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS[0]); // 퍼널 렌더링

  return (
    <Container>
      <Header step={currentStep} setStep={setStep} />
      <SignupFunnel
        steps={STEPS}
        setStep={setStep}
        Funnel={Funnel}
        Step={Step}
      />
    </Container>
  );
}

export { SignUpPage };

const Container = styled.div`
  padding-top: 14px;
`;
