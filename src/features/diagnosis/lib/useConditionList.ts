import { useEffect } from "react";
import { useConditions } from "./useConditions";
import { useAtom } from "jotai";
import { selectedConditionAtom } from "../service/selfDiagnosisAtoms";


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
export const useConditionList = () => {
  const { conditions = [], isLoading } = useConditions();

  const [selectedCondition, setSelectedCondition] = useAtom(selectedConditionAtom);

  useEffect(() => {
    if (conditions.length > 0 && !selectedCondition) {
        setSelectedCondition(conditions[0]); // 기본 선택
    }
  }, [conditions, selectedCondition, setSelectedCondition]);

  const toggleCondition = (system: string) => {
    setSelectedCondition(system);
  };

  return {
    selectedCondition,
    allConditions: conditions,
    toggleCondition,
    isLoading,
  };
};