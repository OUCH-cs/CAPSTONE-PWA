import { useEffect } from "react";
import { useConditions } from "./useConditions";
import { useAtom } from "jotai";
import { selectedConditionAtom } from "../service/selfDiagnosisAtoms";
import { ConditionsProps } from "../diagnosis.type";

export const useConditionList = ({system, symptom} : ConditionsProps ) => {
  const { conditions = [], isLoading } = useConditions(system,symptom);

  const [selectedCondition, setSelectedCondition] = useAtom(selectedConditionAtom);

  useEffect(() => {
    if (conditions.length > 0 && !selectedCondition) {
        setSelectedCondition(conditions[0]); // 기본 선택
    }
  }, [conditions, selectedCondition, setSelectedCondition]);

  const toggleCondition = (condition: string) => {
    setSelectedCondition(condition);
  };

  return {
    selectedCondition,
    allConditions: conditions,
    toggleCondition,
    isLoading,
  };
};