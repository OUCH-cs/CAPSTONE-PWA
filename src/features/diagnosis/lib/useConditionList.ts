import { useEffect } from "react";
import { useConditions } from "./diagnosis-algorithm/useConditions";
import { useAtom } from "jotai";
import { selectedConditionAtom } from "../service/selfDiagnosisAtoms";
import { ConditionsProps } from "../diagnosis.type";

export const useConditionList = ({system, symptom, languageCode} : ConditionsProps ) => {
  const { conditions = [], isLoading } = useConditions(system,symptom,languageCode);
  const [selectedCondition, setSelectedCondition] = useAtom(selectedConditionAtom);

  useEffect(() => {
    if (conditions.length > 0 && !selectedCondition) {
        setSelectedCondition(conditions[0]);
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