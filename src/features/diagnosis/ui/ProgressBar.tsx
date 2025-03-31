/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";


interface ProgressBarProps {
  progress: number; // 0~100
  currentStep: string;
}

const ProgressBar = ({ progress, currentStep }: ProgressBarProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 10); // 약간의 지연으로 자연스러운 애니메이션 유도

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div>
      <ProgressBarContainer>
        <Progress style={{ width: `${animatedProgress}%` }} />
      </ProgressBarContainer>
      <p css={progressText}>{currentStep} of 5</p>
    </div>
  );
};

export default ProgressBar;


const ProgressBarContainer = styled.div`
  position: relative;
  height: 8px;
  background-color: ${theme.colors.white};
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 8px;
  margin: 0 16px 8px;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${theme.colors.secondary};
  border-radius: 100px;
  transition: width 0.3s ease;
`;

const progressText = {
  color: theme.colors.gray_7,
  textAlign: "right" as const,
  marginRight: 16,
};