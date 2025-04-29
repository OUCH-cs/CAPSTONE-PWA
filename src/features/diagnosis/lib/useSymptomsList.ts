import { useFormContext } from "react-hook-form";
import { useAtom } from "jotai";
import { useState } from "react";
import { customSymptomsAtom } from "../service/selfDiagnosisAtoms";
import { useSymptoms } from "./useSymptoms";


// 증상 리스트 관리 커스텀 훅
export const useSymptomsList = () => {
  // react-hook-form의 폼 상태 접근
  const { setValue, getValues } = useFormContext<{ symptoms: string[] }>();

  // 폼 초기값 기준으로 현재 선택된 증상 상태 관리 (useState로 제어)
  const [selectedSymptoms, setSelectedSymptoms] = useState(() => getValues("symptoms") || []);

  // 전역 상태에서 사용자 커스텀 증상 목록 가져오기 (jotai)
  const [customSymptoms] = useAtom(customSymptomsAtom);

  const { symptoms = [], isLoading} = useSymptoms();

  // 전체 증상 리스트 구성 (기본 + 커스텀)
  const allSymptoms: string[] = [
    ...symptoms.map((s) => s.name), // Symptom → string
    ...customSymptoms,              // 이미 string[]
  ];

  // 증상 토글 로직 (선택/해제)
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
    isLoading,
  };
};