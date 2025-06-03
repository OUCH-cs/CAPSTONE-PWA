import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import PrevBtn from "@/shared/assets/common/arrow.svg?react";
import { useNavigate } from "react-router-dom";

function SearchDetailHeader({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  return (
    <Container>
      <IconWrapper onClick={() => navigate(-1)}>
        <PrevBtn width="28" height="28" stroke="#000" />
      </IconWrapper>
      <Title>{children}</Title>
    </Container>
  );
}

export { SearchDetailHeader };

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 60px;

  padding-top: 16px;
  margin-bottom: 40px;
`;

const IconWrapper = styled.button`
  position: absolute;
  left: 16px;
  background-color: transparent;
  transform: rotate(90deg);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;

  padding: 0 20px;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
`;
