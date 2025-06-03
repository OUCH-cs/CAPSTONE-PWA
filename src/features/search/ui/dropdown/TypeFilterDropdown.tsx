import styled from "@emotion/styled";
import DropdownMenuIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";
import { useAtom } from "jotai";
import { typeFilterAtom } from "../../services/store/filterAtom";
import Dropdown from "@/shared/components/dropdown/Dropdown";
import useToggle from "@/shared/lib/useToggle";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function TypeFilterDropdown() {
  const { t } = useTranslation();
  const [type, setType] = useAtom(typeFilterAtom); // 선택한 타입
  const { isOpen, setIsOpen, toggle } = useToggle();
  const fallbackType = t("Facility");

  const getEnName = (menu: "병원" | "약국" | null) => {
    if (menu === "병원") {
      return "Hospital";
    } else if (menu === "약국") {
      return "Pharmacy";
    }
  };

  const handleClick = async (menu: any) => {
    const krMenu = menu === "Hospital" ? "병원" : "약국";
    setType(krMenu);
    toggle();
  };

  const enName = getEnName(type) ?? "";

  useEffect(() => {
    return () => {
      setType(null);
    };
  }, []);

  return (
    <>
      <Dropdown setIsOpen={setIsOpen}>
        <Dropdown.Trigger onClick={toggle}>
          <TriggerWrapper $isSelected={!!type}>
            {enName ? t(enName) : fallbackType}
            <IconWrapper>
              <DropdownMenuIcon width="16" height="16" stroke="#767676" />
            </IconWrapper>
          </TriggerWrapper>
        </Dropdown.Trigger>

        <Dropdown.Menu isOpen={isOpen} top="35px" left="0px">
          <MenuWrapper>
            {["Hospital", "Pharmacy"].map((menu, index) => (
              <MenuItem
                key={index}
                onClick={() => handleClick(menu)}
                $isSelected={menu === getEnName(type)}
              >
                {t(menu)}
              </MenuItem>
            ))}
          </MenuWrapper>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

const TriggerWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: fit-content;
  height: 31px;
  padding: 7px 12px;
  border: 1px solid ${theme.colors.white_e5};
  border-radius: 20px;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.white_f1 : theme.colors.white};
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
  align-items: center;
  width: 100px;
  height: fit-content;
  border-radius: 16px;
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.08);
  overflow-y: auto;
`;

const MenuItem = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  min-height: 40px;
  font-size: 15px;
  font-weight: 400;
  color: #000000;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.white_f1 : theme.colors.white};
`;
