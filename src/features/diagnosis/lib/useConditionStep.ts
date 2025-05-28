import { useState } from "react";
import { useAtom } from "jotai";
import { selectedSystemAtom, selectedSymptomAtom } from "../service/selfDiagnosisAtoms";
import { languageCodeAtom } from "@/shared/services/languageCodeAtom";
import { useAlgorithm } from "./diagnosis-algorithm/useAlgorithm";
import { DiagnosisAlgorithm } from "../diagnosis.type";

/**
 * 조건 기반(condition) 알고리즘 스텝 진입 여부를 판단하고, 관련 상태를 관리하는 커스텀 훅입니다.
 *
 * - 현재 system과 symptom에 해당하는 알고리즘 목록을 조회합니다.
 * - 그중 "three-step" 타입이 존재하면 조건 스텝으로 진입하도록 상태를 업데이트합니다.
 * - 조건 스텝이 없으면 `onNext()`를 호출해 다음 단계로 바로 이동합니다.
 *
 * @param onNext - 조건 분기 없이 다음 스텝으로 이동할 때 호출되는 콜백 (기본값: 빈 함수)
 * @returns {{
*   showConditions: boolean,
*   conditionData: DiagnosisAlgorithm[] | null,
*   system: string,
*   symptom: string,
*   languageCode: string,
*   checkConditionsAndProceed: () => void,
*   setShowConditions: React.Dispatch<React.SetStateAction<boolean>>
* }}
*/

export const useConditionStep = (onNext: () => void = () => {}) => {
  const [symptom] = useAtom(selectedSymptomAtom);
  const [system] = useAtom(selectedSystemAtom);
  const [languageCode] = useAtom(languageCodeAtom)
  const { algorithms = [] } = useAlgorithm();
  /**
    * 조건 스텝(three-step 알고리즘)을 보여줄지 여부를 관리하는 상태
    * true일 경우, 조건 분기 UI가 렌더링됨
    */
  const [showConditions, setShowConditions] = useState(false);
  /**
   * 조건 스텝에서 사용할 알고리즘 데이터 목록
   * 현재 system과 symptom 조합에 해당하는 DiagnosisAlgorithm 배열
   * 조건 스텝이 없으면 null
   */
  const [conditionData, setConditionData] = useState<DiagnosisAlgorithm[] | null>(null);

  const checkConditionsAndProceed = () => {
    // symptom과 system이 정확히 일치하는 항목 필터링
    const matchingItems = algorithms.filter(
      (item) =>
        item.system?.en === system &&
        item.symptom?.en === symptom
    );

    // 그 중 type이 "three-step"인 항목이 하나라도 있으면 조건 스텝으로 이동
    const hasThreeStep = matchingItems.some(
      (item) => item.type === "three-step"
    );

    if (hasThreeStep) {
      setConditionData(matchingItems);
      setShowConditions(true);
    } else {
      onNext();
    }
  };

  return {
    showConditions,
    conditionData,
    system,
    symptom,
    languageCode,
    checkConditionsAndProceed,
    setShowConditions,
  };
};