import { useFormContext } from "react-hook-form";
import { useAtom } from "jotai";
import { useState } from "react";
import { customSymptomsAtom } from "../service/selfDiagnosisAtoms";
import { SYMPTOMS } from "@/shared/mock";

export const useSymptomsList = () => {
  const { setValue, getValues } = useFormContext<{ symptoms: string[] }>();
  const [selectedSymptoms, setSelectedSymptoms] = useState(() => getValues("symptoms") || []);

  // 따로 분리시켜야 하지않나?/
  const [customSymptoms] = useAtom(customSymptomsAtom);
  const allSymptoms = [...SYMPTOMS, ...customSymptoms];

  const toggleSymptom = (symptom: string) => {
    const updatedSymptoms = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];

    setValue("symptoms", updatedSymptoms);
    setSelectedSymptoms(updatedSymptoms);
  };

  return {
    selectedSymptoms,
    allSymptoms,
    toggleSymptom,
  };
};