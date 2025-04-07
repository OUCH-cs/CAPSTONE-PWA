// hooks/useSelectedSymptoms.ts
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

export const useSelectedSymptoms = () => {
  const { getValues, setValue } = useFormContext<{ symptoms: string[] }>();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // 초기값 셋팅
  useEffect(() => {
    const initial = getValues("symptoms") || [];
    setSelectedSymptoms(initial);
  }, [getValues]);

  const removeSymptom = (symptom: string) => {
    const updated = selectedSymptoms.filter((s) => s !== symptom);
    setValue("symptoms", updated);
    setSelectedSymptoms(updated); 
  };

  return { selectedSymptoms, removeSymptom };
};