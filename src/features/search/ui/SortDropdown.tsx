import { useEffect } from "react";
import { useAtom } from "jotai";
import styled from "@emotion/styled";
import DropdownMenuIcon from "@/shared/assets/common/arrow.svg?react";
import { sortFilterAtom } from "../services/store/filterAtom";
import { Sort, SortDropdownProps } from "../search.types";
import Dropdown from "@/shared/components/dropdown/Dropdown";

export default function SortDropdown({
  isOpen,
  setIsOpen,
  toggle,
  menus,
}: SortDropdownProps) {
  const [sort, setSort] = useAtom(sortFilterAtom);

  const handleClick = (sort: Sort) => {
    setSort(sort);
    toggle();
  };

  useEffect(() => {
    setSort("Recommended");
  }, []);

  return (
    <Dropdown setIsOpen={setIsOpen}>
      <Dropdown.Trigger onClick={toggle}>
        <TriggerWrapper>
          {sort}
          <IconWrapper>
            <DropdownMenuIcon width="16" height="16" stroke="#767676" />
          </IconWrapper>
        </TriggerWrapper>
      </Dropdown.Trigger>

      <Dropdown.Menu isOpen={isOpen} top="35px" right="10px">
        <MenuWrapper>
          {menus.map((menu, index) => (
            <MenuItem
              key={index}
              onClick={() => handleClick(menu)}
              $isSelected={menu === sort}
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
