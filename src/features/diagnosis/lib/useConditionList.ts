import { useEffect } from "react";
import { useConditions } from "./diagnosis-algorithm/useConditions";
import { useAtom } from "jotai";
import { selectedConditionAtom } from "../service/selfDiagnosisAtoms";
import { ConditionsProps } from "../diagnosis.type";

/**
 * 조건(condition) 리스트를 가져오고 선택 상태를 관리하는 커스텀 훅입니다.
 *
 * - 특정 system + symptom + languageCode에 따라 조건 목록을 가져옵니다.
 * - 조건 목록이 존재할 경우, 첫 번째 값을 자동 선택합니다.
 * - 전역 상태(selectedConditionAtom)를 기반으로 조건 선택을 관리합니다.
 * - toggleCondition을 통해 조건리스트 중 선택
 * 
 * @param {ConditionsProps} - system, symptom, languageCode 세 가지 값을 포함한 파라미터

*/

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