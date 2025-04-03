import { useFormContext } from "react-hook-form";
import { useSymptomsStore } from "@/features/diagnosis/service/useDiagnosisStore";
import { SYMPTOMS } from "@/shared/mock";

export const useSymptomsList = () => {
  const { setValue, watch } = useFormContext<{ symptoms: string[] }>();
  const selectedSymptoms = watch("symptoms") || [];
  
  // 따로 분리시켜야 하지않나?/
  const { customSymptoms } = useSymptomsStore();
  const allSymptoms = [...SYMPTOMS, ...customSymptoms];

  const toggleSymptom = (symptom: string) => {
    const updatedSymptoms = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];

    setValue("symptoms", updatedSymptoms);
  };

  return {
    selectedSymptoms,
    allSymptoms,
    toggleSymptom,
  };
};