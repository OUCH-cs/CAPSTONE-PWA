import { useRef } from "react";
import styled from "@emotion/styled";
import DropdownTrigger from "./Trigger";
import DropdownMenu from "./Menu";
import { IDropdown } from "@/shared/types";
import useClickOutside from "@/shared/lib/useClickOutside";

/**
 * 드롭다운 트리거 및 메뉴를 위한 컨테이너를 제공하는 드롭다운 컴포넌트입니다.
 *
 * @param {ReactNode} children - 드롭다운의 내용으로, 일반적으로 Dropdown.Trigger 및 Dropdown.Menu를 포함합니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - 드롭다운의 열림 상태를 설정하는 함수입니다.
 */

export default function Dropdown({ children, setIsOpen }: IDropdown) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setIsOpen);

  return <DropdownContainer ref={dropdownRef}>{children}</DropdownContainer>;
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  background-color: transparent;
`;
