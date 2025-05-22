import { useState } from "react";
import { useAtom } from "jotai";
import { useFormContext, useWatch } from "react-hook-form";
import { selectedSystemAtom, languageCodeAtom } from "../service/selfDiagnosisAtoms";
import { useAlgorithm } from "./diagnosis-algorithm/useAlgorithm";
import { DiagnosisAlgorithm } from "../diagnosis.type";

export const useConditionStep = (onNext: () => void = () => {}) => {
  const { control } = useFormContext();
  const symptom = useWatch({ control, name: "symptom" });
  const [system] = useAtom(selectedSystemAtom);
  const [languageCode] = useAtom(languageCodeAtom)
  const { algorithms = [] } = useAlgorithm();
  const [showConditions, setShowConditions] = useState(false);
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