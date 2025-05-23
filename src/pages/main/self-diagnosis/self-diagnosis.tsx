import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import DiagnosisPost from "@/features/diagnosis/ui/Funnel";
import { useState } from "react";
import ProgressBar from "@/features/diagnosis/ui/ProgressBar";
import theme from "@/shared/styles/theme";
import { useForm, FormProvider } from "react-hook-form";
import { DiagnosisFormData } from "@/features/diagnosis/diagnosis.type";
import { handleNextClick, handlePrevClick, useFunnel, useProgress } from "@/shared/lib/funnel";
import { useSubmitDiagnosis } from "@/features/diagnosis/lib/useDiagnosis";
import { Header } from "@/features/diagnosis/ui/Header";

const steps = ["1", "2", "3", "4", "5", "6"];

function SelfDiagnosisPage() {
  const navigate = useNavigate();
  const { Funnel, Step, setStep } = useFunnel(steps[0]);
  const { currentStep, setCurrentStep, initialProgress, getCurrentStepIndex } = useProgress(steps);
  const [progress, setProgress] = useState<number>(initialProgress);
  const { onSubmit } = useSubmitDiagnosis()

  const methods = useForm<DiagnosisFormData>({
    defaultValues: {
      visitType: "HOSPITAL",
      symptom: "",
      duration: "",
      painSeverity: 5,
      additionalNote: "",
    },
  });

  const nextClickHandler = handleNextClick(
    getCurrentStepIndex,
    steps,
    setStep,
    setCurrentStep,
    setProgress
  );

  const prevClickHandler = handlePrevClick(
    getCurrentStepIndex,
    steps,
    setStep,
    setCurrentStep,
    setProgress,
    navigate,
  );

  return (
    <Container>
      <Header/>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            onSubmit(data, methods.reset, navigate) 
          )}
        >
        <ProgressBar progress={progress} currentStep={currentStep} />
        <DiagnosisPost
          steps={steps}
          nextClickHandler={nextClickHandler}
          prevClickHandler={prevClickHandler}
          Funnel={Funnel}
          Step={Step}
        />
        </form>
      </FormProvider>
    </Container>
  );
};

export { SelfDiagnosisPage };

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 16px;
  overflow: hidden;
`;