import { Button } from "@/shared/components/button/Button";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import signupSuccessImg from "@/shared/assets/auth/sign-up-success.png";
import { useEffect, useState } from "react";

function SignupSuccessPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Container $isVisible={isVisible}>
      <InnerWrapper>
        <Title>
          Welcome to <br />
          OUCH!
        </Title>

        <ImgWrapper>
          <img src={signupSuccessImg} alt="signup-success-image" />
        </ImgWrapper>

        <Button onClick={() => navigate("/")}>START</Button>
      </InnerWrapper>
    </Container>
  );
}

export { SignupSuccessPage };

const Container = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;

  opacity: 0;
  transition: opacity 0.9s ease-in;

  ${({ $isVisible }) => $isVisible && "opacity: 1"}
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  color: black;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
