import { IButtonProps } from "@/shared/types/components.types";
import styled from "@emotion/styled";

function Button({
  children,
  width = 328,
  height = 48,
  onClick,
  disabled = false,
  ...props
}: IButtonProps) {
  return (
    <Container
      width={width}
      height={height}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Container>
  );
}

export { Button };

const Container = styled.button<{
  width: number;
  height: number;
  disabled?: boolean;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 0.1s ease;

  &:active:not(:disabled) {
    transform: scale(0.97);
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.white_e5};
    color: ${({ theme }) => theme.colors.gray_7};
    cursor: not-allowed;
  }
`;
