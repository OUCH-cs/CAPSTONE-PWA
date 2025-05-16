// 버튼
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

// 드롭다운
interface IDropdown {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDropdownMenu {
  children: React.ReactNode;
  isOpen: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface IDropdownTrigger {
  children: React.ReactNode;
  onClick: () => void;
}

export type {
  IButtonProps,
  IModalProps,
  IDropdown,
  IDropdownMenu,
  IDropdownTrigger,
};
