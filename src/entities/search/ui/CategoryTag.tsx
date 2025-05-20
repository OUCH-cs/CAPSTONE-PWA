import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type CategoryTagType = "Hospital" | "Pharmacy";

export default function CategoryTag({ children }: PropsWithChildren) {
  const type = children as CategoryTagType;

  return <Container $type={type}>{children}</Container>;
}

const Container = styled.div<{ $type: CategoryTagType }>`
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
    $type === "Hospital" ? "#E1F5EC " : "#E5EEF5"};
`;
