import { useFormContext } from "react-hook-form";
import { useSymptoms } from "./diagnosis-algorithm/useSymptoms";
import { useAtom } from "jotai";
import { selectedSystemAtom, selectedSymptomAtom,languageCodeAtom } from "@/features/diagnosis/service/selfDiagnosisAtoms";


/**
 * 증상(Symptoms) 리스트를 가져오고 선택 상태를 관리하는 커스텀 훅입니다.
 *
 * - 특정 system + languageCode에 따라 증상 목록을 가져옵니다.
 * - 전역 상태(selectedSymptomAtom)를 기반으로 증상 선택을 관리합니다.
 * - toggleSymptom을 통해 증상리스트 중 선택
 * 
 * 

*/

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