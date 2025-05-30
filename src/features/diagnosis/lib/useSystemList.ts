import { useEffect } from "react";
import { useSystems } from "./diagnosis-algorithm/useSystems";
import { useAtom } from "jotai";
import { selectedSystemAtom} from "../service/selfDiagnosisAtoms";
import { useLanguage } from "@/shared/services/useLanguage";

/**
 * 시스템(systems) 리스트를 가져오고 선택 상태를 관리하는 커스텀 훅입니다.
 *
 * - 특정 languageCode에 따라 시스템 목록을 가져옵니다.
 * - 시스템 목록이 존재할 경우, 첫 번째 값을 자동 선택합니다.
 * - 시스템 상태(selectedSystemAtom)를 기반으로 시스템 선택을 관리합니다.
 * - toggleSystem을 통해 증상리스트 중 선택
 * 
 * 

*/

export const useSystemsList = () => {
  const {languageCode} = useLanguage();
  const { systems = [], isLoading } = useSystems(languageCode);
  const [selectedSystem, setSelectedSystem] = useAtom(selectedSystemAtom);
  
  useEffect(() => {
    if (systems.length > 0 && !selectedSystem) {
      setSelectedSystem(systems[0]); // 기본 선택
    }
  }, [systems]);

  console.log(selectedSystem)

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