import { useFormContext } from "react-hook-form";
import { useAtom } from "jotai";
import { customSymptomsAtom } from "../service/selfDiagnosisAtoms";
import { SYMPTOMS } from "@/shared/mock";

export const useSymptomsList = () => {
  const { setValue, watch } = useFormContext<{ symptoms: string[] }>();
  const selectedSymptoms = watch("symptoms") || [];
  
  // 따로 분리시켜야 하지않나?/
  const [customSymptoms] = useAtom(customSymptomsAtom);
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