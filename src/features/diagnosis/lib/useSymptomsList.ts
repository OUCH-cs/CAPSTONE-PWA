import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useSystems } from "./useSymptoms";
import { useSymptoms } from "./useSymptoms";

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
export const useSystemsList = () => {
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

export const useSymptomsList = () => {
  const { setValue, getValues } = useFormContext<{ systems: string; symptoms: string[] }>();
  const selectedSystem = getValues("systems"); 
  const [selectedSymptoms, setSelectedSymptoms] = useState(() => getValues("symptoms") || "");

  const { symptoms = [] } = useSymptoms(selectedSystem);

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
    selectedSystem,
    allSymptoms,
    toggleSymptom,
  };
};