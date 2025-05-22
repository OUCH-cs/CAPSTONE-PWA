import { useFormContext } from "react-hook-form";
import { useSymptoms } from "./diagnosis-algorithm/useSymptoms";
import { useAtom } from "jotai";
import { selectedSystemAtom, selectedSymptomAtom,languageCodeAtom } from "@/features/diagnosis/service/selfDiagnosisAtoms";

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