import styled from "@emotion/styled";
import DropdownMenuIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";
import { useAtom } from "jotai";
import { departmentFilterAtom } from "../../services/store/filterAtom";
import { Department, DepartmentDropdownProps } from "../../search.types";
import { useEffect } from "react";
import Dropdown from "@/shared/components/dropdown/Dropdown";

export default function DepartmentFilterDropdown({
  isOpen,
  setIsOpen,
  toggle,
  menus,
}: DepartmentDropdownProps) {
  const [department, setDepartment] = useAtom(departmentFilterAtom);

  const handleClick = (menu: Department) => {
    setDepartment(menu);
    toggle();
  };

  useEffect(() => {
    setDepartment(null);
  }, []);

  return (
    <Dropdown setIsOpen={setIsOpen}>
      <Dropdown.Trigger onClick={toggle}>
        <TriggerWrapper>
          {department || "Medical Department"}
          <IconWrapper>
            <DropdownMenuIcon width="16" height="16" stroke="#767676" />
          </IconWrapper>
        </TriggerWrapper>
      </Dropdown.Trigger>

      <Dropdown.Menu isOpen={isOpen} top="35px" left="0px">
        <MenuWrapper>
          {menus.map((menu, index) => (
            <MenuItem
              key={index}
              onClick={() => handleClick(menu)}
              $isSelected={menu === department}
            >
              {menu}
            </MenuItem>
          ))}
        </MenuWrapper>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const TriggerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 31px;
  padding: 0 12px;
  border: 1px solid ${theme.colors.white_e5};
  border-radius: 20px;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 172px;
  border-radius: 16px;
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const MenuItem = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  height: 40px;
  font-size: 15px;
  font-weight: 400;
  color: #000000;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.white_f1 : theme.colors.white};
`;
