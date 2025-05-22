import { NavigateFunction } from 'react-router-dom';

// 다음 스텝의 이동, 진행률 업데이트 함수
const navigateOrSetStep = (
  index: number,
  steps: string[],
  setStep: (step: string) => void,
  setCurrentStep: (step: string) => void,
  setProgress?: (progress: number) => void,
  navigateFn?: NavigateFunction,
) => {
  if (index < 0 && navigateFn) {
      navigateFn(-1);
  }

  // 유효한 인덱스인지 검사 (0 이상, 전체 스텝 개수 미만)
  if (index >= 0 && index < steps.length) {
    const nextStep = steps[index];
    setStep(nextStep);
    setCurrentStep(nextStep);

    if (setProgress) setProgress(((index + 1) / steps.length) * 100);
  }
};

// 전체 스텝 이동, 진행률 관리 함수
const handleNextClick =
  (
    getCurrentStepIndex: () => number,
    steps: string[],
    setStep: (step: string) => void,
    setCurrentStep: (step: string) => void,
    setProgress?: (progress: number) => void
  ) =>
  () => {
    const nextIndex = getCurrentStepIndex() + 1;
    navigateOrSetStep(nextIndex, steps, setStep, setCurrentStep, setProgress);
  };

export { handleNextClick };

// navigate은 첫번째 페이지에서 뒤로 이동하여 페이지 나갈 시 필요
export const handlePrevClick =
  (
    getCurrentStepIndex: () => number,
    steps: string[],
    setStep: (step: string) => void,
    setCurrentStep: (step: string) => void,
    setProgress: (progress: number) => void,
    navigate: NavigateFunction,
  ) =>
  () => {
    const prevIndex = getCurrentStepIndex() - 1;
    navigateOrSetStep(
      prevIndex,
      steps,
      setStep,
      setCurrentStep,
      setProgress,
      navigate,
    );
  };