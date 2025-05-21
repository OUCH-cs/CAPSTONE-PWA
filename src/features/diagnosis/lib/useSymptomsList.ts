import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { useSystems } from "./useSymptoms";
import { useSymptoms } from "./useSymptoms";
import { useAtom } from "jotai";
import { selectedSystemAtom, selectedSymptomAtom,languageCodeAtom } from "@/features/diagnosis/service/selfDiagnosisAtoms";


/**
 * 자가진단 입력 시 사용할 증상 목록과 선택된 증상 상태를 관리하는 커스텀 훅 (단일 선택 버전)
 *
 * @returns {
 *   selectedSymptom: string;
 *   allSymptoms: string[];
 *   toggleSymptom: (symptom: string) => void;
 *   isLoading: boolean;
 * }
 */
export const useSystemsList = () => {
  const { systems = [], isLoading } = useSystems();
  const [selectedSystem, setSelectedSystem] = useAtom(selectedSystemAtom);

  useEffect(() => {
    if (systems.length > 0 && !selectedSystem) {
      setSelectedSystem(systems[0]); // 기본 선택
    }
  }, [systems, selectedSystem, setSelectedSystem]);

  const toggleSystem = (system: string) => {
    setSelectedSystem(system);
  };

  return {
    selectedSystem,
    allSystems: systems,
    toggleSystem,
    isLoading,
  };
};

export const useSymptomsList = () => {
  const [languageCode]=useAtom(languageCodeAtom)
  const [selectedSystem] = useAtom(selectedSystemAtom);
  const [selectedSymptom, setSelectedSymptom] = useAtom(selectedSymptomAtom);
  const { setValue } = useFormContext<{ symptom: string }>();

  const { symptoms = [] } = useSymptoms(selectedSystem,languageCode);

  const allSymptoms: string[] = symptoms;

  const toggleSymptom = (symptom: string) => {

    setValue("symptom", symptom);
    setSelectedSymptom(symptom);
  };

  return {
    selectedSymptom,
    selectedSystem,
    allSymptoms,
    toggleSymptom,
  };
};