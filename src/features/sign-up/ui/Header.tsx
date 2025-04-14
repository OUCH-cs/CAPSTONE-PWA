import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import BackArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { useNavigate } from "react-router-dom";

function Header({
  step,
  setStep,
}: {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (step === "1") {
      navigate("/sign-in");
      setStep("1");
    } else if (Number(step) >= 2) {
      setStep((prev) => {
        let curr = Number(prev);
        return String(--curr);
      });
    }
  };

  return (
    <Container>
      <BackwardIconWrapper onClick={handlePrevClick}>
        <BackArrowIcon width={28} height={28} />
      </BackwardIconWrapper>
      <Title>Sign Up</Title>
    </Container>
  );
}

export { Header };

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 360px;
  max-width: 450px;
  width: 100%;
  margin-bottom: 105px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.black};
`;

const BackwardIconWrapper = styled.div`
  position: absolute;
  //   top: 50%;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
`;
