import { STEPS } from "@/features/translate/translate.consts";
import GuideFunnel from "@/features/translate/ui/guide/GuideFunnel";
import { useFunnel } from "@/shared/lib/funnel";

function TranslateGuidePage() {
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS[0]); // 퍼널 렌더링

  return (
    <>
      <GuideFunnel
        steps={STEPS}
        setStep={setStep}
        Funnel={Funnel}
        Step={Step}
        currentStep={currentStep}
      />
    </>
  );
}

export { TranslateGuidePage };
