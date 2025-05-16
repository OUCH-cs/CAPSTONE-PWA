import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useSymptoms } from "./useSymptoms";

/**
 * 자가진단 입력 시 사용할 증상 목록과 선택된 증상 상태를 관리하는 커스텀 훅
 * 
 * - 기본 증상은 API에서 받아오며
 * - 선택된 증상은 react-hook-form과 연결되어 저장
 *
 * @returns 
*   selectedSymptoms: string[],
*   allSymptoms: string[],
*   toggleSymptom: (symptom: string) => void,
*   isLoading: boolean
*   증상 목록, 선택 상태, 선택 토글 함수, 로딩 상태 반환
*/

export const useSymptomsList = () => {

  const { setValue, getValues } = useFormContext<{ symptoms: string[] }>();

  const [selectedSymptoms, setSelectedSymptoms] = useState(() => getValues("symptoms") || []);

  const { symptoms = [], isLoading} = useSymptoms();

  const allSymptoms: string[] = symptoms;

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