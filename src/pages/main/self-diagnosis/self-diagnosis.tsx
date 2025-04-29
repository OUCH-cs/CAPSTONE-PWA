import styled from "@emotion/styled";
import DiagnosisPost from "@/features/diagnosis/ui/Funnel";
import { useState } from "react";
import ProgressBar from "@/features/diagnosis/ui/ProgressBar";
import theme from "@/shared/styles/theme";
import { useForm, FormProvider } from "react-hook-form";
import { useAtom } from "jotai";
import { currentPageAtom } from "@/features/diagnosis/service/selfDiagnosisAtoms";
import { DiagnosisFormData } from "@/features/diagnosis/diagnosis.type";
import { handleNextClick, useFunnel, useProgress } from "@/shared/lib/funnel";
import { useSubmitDiagnosis } from "@/features/diagnosis/lib/useDiagnosis";

const steps = ["1", "2", "3", "4", "5"];

function SelfDiagnosisPage() {
  const [currentPage] = useAtom(currentPageAtom);
  const { Funnel, Step, setStep } = useFunnel(steps[0]);
  const { currentStep, setCurrentStep, initialProgress, getCurrentStepIndex } =
    useProgress(steps);
  const [progress, setProgress] = useState<number>(initialProgress);

  const methods = useForm<DiagnosisFormData>({
    defaultValues: {
      visitType: "HOSPITAL",
      symptoms: [],
      duration: "LESS_THAN_1_DAY",
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


  const { submit } = useSubmitDiagnosis();

  const onSubmit = async (formData:DiagnosisFormData) => {
    try {
      const response = await submit(formData); 
      alert("Successfully submitted!");
      console.log(response.data)
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(`Submission failed: ${e.message}`);
      } else {
        alert("Submission failed due to an unknown error.");
      }
    }
  };


  return (
    <Container>
      <Title>Self-diagnosis</Title>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
        {currentPage === "main" && (
          <ProgressBar progress={progress} currentStep={currentStep} />
        )}
        <DiagnosisPost
          steps={steps}
          nextClickHandler={nextClickHandler}
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
  overflow-y: auto;
`;

const Title = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
  padding: 1.5rem;
  margin-bottom: 2.3rem;
`;
