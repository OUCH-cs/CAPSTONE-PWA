import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

export default function CategoryTag({ children }: PropsWithChildren) {
  return <Container $type={children}>{children}</Container>;
}

const Container = styled.div<{ $type: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 28px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  color: #111111;
  background-color: ${({ $type }) =>
    $type === "약국" ? "#E5EEF5" : "#E1F5EC"};
`;
