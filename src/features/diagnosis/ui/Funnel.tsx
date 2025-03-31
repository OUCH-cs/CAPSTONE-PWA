import React from 'react';
import { FunnelProps, StepProps } from '../lib/useFunnel';
import StepOne from './pages/StepOne';
import StepTwo from './pages/StepTwo';
import StepThree from './pages/StepThree';
import StepFour from './pages/StepFour';
import StepFive from './pages/StepFive';

export interface ClassPostProps {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const DiagnosisPost = ({ steps, nextClickHandler, Funnel, Step }: ClassPostProps) => {
  return (

    <Funnel>
      <Step name={steps[0]}>
        <StepOne onNext={() => nextClickHandler(steps[1])} />
      </Step>
      <Step name={steps[1]}>
        <StepTwo onNext={() => nextClickHandler(steps[2])} />
      </Step>
      <Step name={steps[2]}>
        <StepThree onNext={() => nextClickHandler(steps[3])} />
      </Step>
      <Step name={steps[3]}>
        <StepFour onNext={() => nextClickHandler(steps[4])} />
      </Step>
      <Step name={steps[4]}>
        <StepFive/>
      </Step>
    </Funnel>
  );
};

export default DiagnosisPost;
