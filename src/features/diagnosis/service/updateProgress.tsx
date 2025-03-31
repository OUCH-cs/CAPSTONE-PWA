// 다음 스텝의 이동, 진행률 업데이트 함수
const navigateOrSetStep = (
    index: number,
    steps: string[],
    setStep: (step: string) => void,
    setCurrentStep: (step: string) => void,
    setProgress: (progress: number) => void,
  ) => {
    // 유효한 인덱스인지 검사 (0 이상, 전체 스텝 개수 미만)
    if (index >= 0 && index < steps.length) {
      const nextStep = steps[index];
      setStep(nextStep);
      setCurrentStep(nextStep);
      setProgress(((index + 1) / steps.length) * 100);
    }
  };
  
  // 전체 스텝 이동, 진행률 관리 함수 
  // 헤더 추가 시 뒤로 이동하는 로직 추가 예정
  export const handleNextClick =
    (
      getCurrentStepIndex: () => number,
      steps: string[],
      setStep: (step: string) => void,
      setCurrentStep: (step: string) => void,
      setProgress: (progress: number) => void,
    ) =>
    () => {
      const nextIndex = getCurrentStepIndex() + 1;
      navigateOrSetStep(nextIndex, steps, setStep, setCurrentStep, setProgress);
    };
  
  
    
  