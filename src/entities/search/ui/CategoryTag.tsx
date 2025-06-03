import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

export default function CategoryTag({ children }: PropsWithChildren) {
  return <Container $type={children}>{children}</Container>;
}

const Container = styled.div<{ $type: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 76px;
  width: fit-content;
  height: 28px;
  padding: 7px 11px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  color: #111111;
  background-color: ${({ $type }) =>
    $type === "약국" || $type === "pharmacy" || $type === "药房"
      ? "#E5EEF5"
      : "#E1F5EC"};
`;
