import styled from "@emotion/styled";
import Logo from "@/shared/assets/common/Logo";
import LoginForm from "@/features/sign-in/ui/LoginForm";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>Login</Title>

      <LoginForm />

      <ForgotIDPWWrapper>
        <span>Forgot ID</span>
        <span>|</span>
        <span>Forgot PW</span>
      </ForgotIDPWWrapper>

      <NavigateSignUp>
        <p>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </NavigateSignUp>
    </Container>
  );
}

export { SignInPage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LogoWrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin-bottom: 42px;
`;

const ForgotIDPWWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 145px;
  margin: 16px 0 86px 0;
  cursor: pointer;

  & span {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray_7};
  }
`;

const NavigateSignUp = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray_7};

  & a {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;
