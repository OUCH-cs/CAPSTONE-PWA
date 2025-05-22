import { useEffect } from "react";
import { useSystems } from "./diagnosis-algorithm/useSystems";
import { useAtom } from "jotai";
import { selectedSystemAtom,languageCodeAtom } from "../service/selfDiagnosisAtoms";

export const useSystemsList = () => {
  const [languageCode]=useAtom(languageCodeAtom)
  const { systems = [], isLoading } = useSystems(languageCode);
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