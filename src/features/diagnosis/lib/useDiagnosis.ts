// src/features/diagnosis/lib/useDiagnosis.ts
import { postDiagnosis } from "../service/api";
import { DiagnosisFormData } from "@/features/diagnosis/diagnosis.type";

export const useSubmitDiagnosis = () => {
  const onSubmit = async (
    formData: DiagnosisFormData,
    reset: () => void,
    navigate: (path: string) => void
  ) => {
    try {
      await postDiagnosis(formData);
      reset();                     
      navigate("/recommend");      
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(`Submission failed: ${e.message}`);
      } else {
        alert("Submission failed due to an unknown error.");
      }
    }
  };

  return { onSubmit };
};


  