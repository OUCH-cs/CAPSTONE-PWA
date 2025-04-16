import styled from "@emotion/styled";

interface GenderSelectionItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected: boolean;
}

function GenderSelectionItem({
  children,
  isSelected = false,
  ...props
}: GenderSelectionItemProps) {
  return (
    <Container $isSelected={isSelected} {...props}>
      {children}
    </Container>
  );
}

export { GenderSelectionItem };

const Container = styled.button<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 164px;
  height: 56px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.gray_7};
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : theme.colors.white};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.tertiary : theme.colors.white};
  transition: all 0.4s ease-in-out;
`;
