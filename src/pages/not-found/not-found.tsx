import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import ErrorIcon from "@/shared/assets/common/error.svg?react";
import { Button } from "@/shared/components/button/Button";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container>
      <ErrorWrapper>
        <IconWrapper>
          <ErrorIcon />
        </IconWrapper>
        <strong>404 ERROR</strong>
        <p>Page Not Found</p>
      </ErrorWrapper>

      <RoutingHomeButton to="/">
        <Button>Go Home</Button>
      </RoutingHomeButton>
    </Container>
  );
}

export { NotFoundPage };

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100dvw;
  height: calc(100vh);
  background-color: ${theme.colors.background};
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & strong {
    margin-bottom: 4px;
    font-size: 24px;
    font-weight: 500;
    color: black;
  }

  & p {
    font-size: 14px;
    font-weight: 400;
    color: ${theme.colors.gray_7};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const RoutingHomeButton = styled(Link)`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
`;
