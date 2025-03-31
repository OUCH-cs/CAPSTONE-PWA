import { useState } from 'react';

type UseProgressReturnType = {
  currentStep: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
  progressStep: () => number;
  initialProgress: number;
  getCurrentStepIndex: () => number;
};
// 자가진단표 입력 단계 관리 커스텀 훅
const useProgress = (steps: string[]): UseProgressReturnType => {
  // 현재 스텝 상태 관리
  const [currentStep, setCurrentStep] = useState<string>(steps[0]);
  // 현재 스텝의 인덱스 반환
  const getCurrentStepIndex = (): number => {
    return steps.indexOf(currentStep);
  };

  // 전체 스텝의 수 반환 
  const getTotalSteps = (): number => {
    return steps.length;
  };

  // 다음 스텝의 진행률(%)을 계산하는 함수
  const progressStep = (): number => {
    const currentStepIndex = getCurrentStepIndex();
    const nextStepIndex = currentStepIndex + 1;
    const totalSteps = getTotalSteps();
    return ((nextStepIndex + 1) / totalSteps) * 100;
  };

  // 초기 진행률(%) 값 설정
  const initialProgress = (1 / steps.length) * 100;

  return {
    currentStep,
    setCurrentStep,
    progressStep,
    initialProgress,
    getCurrentStepIndex,
  };
};

export default useProgress;