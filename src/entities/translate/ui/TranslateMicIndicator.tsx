import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import Mic from "@/shared/assets/common/translate-tab.svg?react";

export default function TranslateMicIndicator() {
  return (
    <Container>
      <Mic width={28} height={45} />
      <Dot />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 40px;
  color: ${theme.colors.primary};
  background-color: ${theme.colors.white};
`;

const Dot = styled.div`
  position: absolute;
  top: 19px;
  right: 19px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.1);
`;
