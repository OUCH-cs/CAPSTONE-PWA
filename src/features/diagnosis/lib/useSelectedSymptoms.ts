// hooks/useSelectedSymptoms.ts
import { useFormContext } from "react-hook-form";

export const useSelectedSymptoms = () => {
  const { getValues, setValue } = useFormContext<{ symptoms: string[] }>();
  const selectedSymptoms = getValues("symptoms") || [];

  const removeSymptom = (symptom: string) => {
    const updated = selectedSymptoms.filter((s) => s !== symptom);
    setValue("symptoms", updated);
  };

  return { selectedSymptoms, removeSymptom };
};