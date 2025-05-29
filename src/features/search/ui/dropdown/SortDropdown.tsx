import { useAtom } from "jotai";
import styled from "@emotion/styled";
import DropdownMenuIcon from "@/shared/assets/common/arrow.svg?react";
import { sortFilterAtom } from "../../services/store/filterAtom";
import { Sort } from "../../types/search.types";
import Dropdown from "@/shared/components/dropdown/Dropdown";
import useToggle from "@/shared/lib/useToggle";
import { useTranslation } from "react-i18next";

export default function SortDropdown() {
  const {t} =  useTranslation()
  const [sort, setSort] = useAtom(sortFilterAtom);
  const { isOpen, setIsOpen, toggle } = useToggle(); // 필터 드롭다운 토글

  const handleClick = (menu: Sort) => {
    setSort(menu);
    toggle();
  };

  return (
    <DropdownWrapper>
      <Dropdown setIsOpen={setIsOpen}>
        <Dropdown.Trigger onClick={toggle}>
          <TriggerWrapper>
            {t(sort)}
            <IconWrapper>
              <DropdownMenuIcon width="16" height="16" stroke="#767676" />
            </IconWrapper>
          </TriggerWrapper>
        </Dropdown.Trigger>

        <Dropdown.Menu isOpen={isOpen} top="30px" right="10px">
          <MenuWrapper>
            {([t("Recommended"), t("Distance")] as Sort[]).map((menu, index) => (
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
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 328px;
  margin-bottom: 16px;
`;

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
