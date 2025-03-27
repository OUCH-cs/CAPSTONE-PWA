interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: number;
  height?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export type { IButtonProps };
