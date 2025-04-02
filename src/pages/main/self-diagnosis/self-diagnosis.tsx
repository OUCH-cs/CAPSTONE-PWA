import styled from "@emotion/styled";
import DiagnosisPost from "@/features/diagnosis/ui/Funnel";
import { useFunnel } from "@/features/diagnosis/lib/useFunnel";
import { useState } from "react";
import ProgressBar from "@/features/diagnosis/ui/ProgressBar";
import useProgress from "@/features/diagnosis/lib/useProgress";
import { handleNextClick } from "@/features/diagnosis/service/updateProgress";
import theme from "@/shared/styles/theme";
import { useForm, FormProvider } from "react-hook-form";
import { useDiagnosisStore } from "@/features/diagnosis/service/useDiagnosisStore";
import { DiagnosisFormData } from "@/features/diagnosis/diagnosis.type";

const steps = ["1", "2", "3", "4", "5"];

function SelfDiagnosisPage () {
  const { currentPage } = useDiagnosisStore();
  const { Funnel, Step, setStep } = useFunnel(steps[0]);
  const { currentStep, setCurrentStep, initialProgress, getCurrentStepIndex } = useProgress(steps);
  const [progress, setProgress] = useState<number>(initialProgress);

  const methods = useForm<DiagnosisFormData>({
    defaultValues: {
      userId: 1,
      visitType: "HOSPITAL",
      symptoms: [],
      duration: "ONE_TO_THREE_DAYS",
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

  return (
    <Container>
      <Title>Self-diagnosis</Title>
      <FormProvider {...methods}>
        {currentPage === "main" && (
          <ProgressBar progress={progress} currentStep={currentStep} />
        )}
        <DiagnosisPost
          steps={steps}
          nextClickHandler={nextClickHandler}
          Funnel={Funnel}
          Step={Step}
        />
      </FormProvider>
    </Container>
  );
};

export {SelfDiagnosisPage}

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 16px;
`;

const Title = styled.p`
  font-size: 20px;
  text-align: center;
  padding: 16px;
  margin-bottom: 32px;
`;