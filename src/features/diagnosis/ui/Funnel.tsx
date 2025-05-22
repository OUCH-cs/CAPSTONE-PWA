import React from "react";
import { FunnelProps, StepProps } from "../../../shared/lib/funnel/useFunnel";
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import StepFour from "./pages/StepFour";
import StepFive from "./pages/StepFive";
import StepSix from "./pages/StepSix";

export interface ClassPostProps {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  prevClickHandler: () => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const DiagnosisPost = ({
  steps,
  nextClickHandler,
  prevClickHandler,
  Funnel,
  Step,
}: ClassPostProps) => {
  return (
    <Funnel>
      <Step name={steps[0]}>
        <StepOne onNext={() => nextClickHandler(steps[1])} onPrev ={() => prevClickHandler()}/>
      </Step>
      <Step name={steps[1]}>
        <StepTwo onNext={() => nextClickHandler(steps[2])} onPrev ={() => prevClickHandler()} />
      </Step>
      <Step name={steps[2]}>
        <StepThree onNext={() => nextClickHandler(steps[3])} onPrev ={() => prevClickHandler()} />
      </Step>
      <Step name={steps[3]}>
        <StepFour onNext={() => nextClickHandler(steps[4])} onPrev ={() => prevClickHandler()} />
      </Step>
      <Step name={steps[4]}>
        <StepFive onNext={() => nextClickHandler(steps[5])} onPrev ={() => prevClickHandler()} />
      </Step>
      <Step name={steps[5]}>
        <StepSix onPrev ={() => prevClickHandler()}/>
      </Step>
    </Funnel>
  );
};

export default DiagnosisPost;