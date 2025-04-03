import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { ProgressBarProps } from "../diagnosis.type";

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
      <ProgressText>{currentStep} of 5</ProgressText>
    </div>
  );
};

export default ProgressBar;


const ProgressBarContainer = styled.div`
  position: relative;
  height: 0.71rem;
  background-color: ${theme.colors.white};
  border-radius: 100px
  overflow: hidden;
  margin-bottom: 0.57rem;
  margin: 0 1.14rem 0.57rem;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${theme.colors.secondary};
  border-radius: 100px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.p`
  color: ${theme.colors.gray_7};
  text-align: right;
  margin-right: 1rem;
`;