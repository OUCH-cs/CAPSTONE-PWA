import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useSystems } from "./useSymptoms";

/**
 * 자가진단 입력 시 사용할 증상 목록과 선택된 증상 상태를 관리하는 커스텀 훅 (단일 선택 버전)
 *
 * @returns {
 *   selectedSymptoms: string;
 *   allSymptoms: string[];
 *   toggleSymptom: (symptom: string) => void;
 *   isLoading: boolean;
 * }
 */
export const useSymptomsList = () => {
  const { setValue, getValues } = useFormContext<{ systems: string }>();

  const [selectedSymptoms, setSelectedSymptoms] = useState(() => getValues("systems") || "");

  const { systems = [], isLoading } = useSystems();

  const allSymptoms: string[] = systems;

  const toggleSymptom = (symptom: string) => {
    setValue("systems", symptom);
    setSelectedSymptoms(symptom);
  };

  return {
    selectedSymptoms,
    allSymptoms,
    toggleSymptom,
    isLoading,
  };
};