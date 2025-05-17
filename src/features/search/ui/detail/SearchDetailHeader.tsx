import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import PrevBtn from "@/shared/assets/common/arrow.svg?react";
import { Link } from "react-router-dom";

function SearchDetailHeader({ children }: PropsWithChildren) {
  return (
    <Container>
      <IconWrapper to="/search">
        <PrevBtn width="28" height="28" stroke="#000" />
      </IconWrapper>
      <Title>{children}</Title>
    </Container>
  );
}

export { SearchDetailHeader };

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 16px;
  margin-bottom: 45px;
`;

const IconWrapper = styled(Link)`
  position: absolute;
  top: 15px;
  left: 16px;
  background-color: transparent;
  transform: rotate(90deg);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
`;
