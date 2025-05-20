import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import RoutingIcon from "@/shared/assets/translate/guide-routing.svg?react";
import Arrow from "@/shared/assets/common/arrow.svg?react";

export default function GuideRoutingButton() {
  return (
    <Container to="/translate/guide">
      <TextWrapper>
        <RoutingIcon />
        Situational Guide
      </TextWrapper>

      <ArrowIconWrapper>
        <Arrow width="16" height="16" stroke="#000" strokeWidth="2" />
      </ArrowIconWrapper>
    </Container>
  );
}

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 211px;
  height: 51px;
  border-radius: 12px;
  background-color: ${theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 400;
  color: "#000000";
`;

const ArrowIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
`;
