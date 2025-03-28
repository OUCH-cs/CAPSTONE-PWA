// 버튼
interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: number;
  height?: number;
  onClick?: () => void;
  disabled?: boolean;
}

// 모달
interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export type { IButtonProps, IModalProps };
