import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

export const useSelectedSymptoms = () => {
  const { getValues, setValue } = useFormContext<{ symptoms: string[] }>();
  // 현재 선택된 증상들 상태 관리
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

 // 폼에서 현재 선택된 증상들 초기값으로 세팅
  useEffect(() => {
    const initial = getValues("symptoms") || [];
    setSelectedSymptoms(initial);
  }, [getValues]);

  // 증상 제거 핸들러
  const removeSymptom = (symptom: string) => {
    const updated = selectedSymptoms.filter((s) => s !== symptom);
    setValue("symptoms", updated);
    setSelectedSymptoms(updated); 
  };

  return { selectedSymptoms, removeSymptom };
};