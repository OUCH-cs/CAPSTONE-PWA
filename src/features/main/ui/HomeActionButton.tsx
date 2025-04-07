import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { ReactNode } from "react";

interface HomeActionButtonProps {
  icon: ReactNode;
  label: string;
  selected?: boolean;
}

const HomeActionButton = ({ icon, label, selected = false }: HomeActionButtonProps) => {
  return (
    <Wrapper selected={selected}>
      {icon}
      <Label selected={selected}>{label}</Label>
    </Wrapper>
  );
};

export default HomeActionButton;

// 스타일
const Wrapper = styled.button<{ selected: boolean }>`
  flex: 1;
  height: 10rem;
  background-color: ${({ selected }) =>
    selected ? theme.colors.tertiary : theme.colors.white};
  border-radius: 20px;
  padding: 3rem 0;
  gap:0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const Label = styled.p<{ selected: boolean }>`
  font-size: 1.2rem;
  color: ${({ selected }) =>
    selected ? theme.colors.primary : theme.colors.black};
`;