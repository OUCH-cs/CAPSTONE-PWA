import styled from "@emotion/styled";
import DropdownMenuIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";
import { useAtom } from "jotai";
import { regionFilterAtom } from "../../services/store/filterAtom";
import Dropdown from "@/shared/components/dropdown/Dropdown";
import useToggle from "@/shared/lib/useToggle";
import useSWR from "swr";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import { useEffect } from "react";
import { getRegions } from "../../services/api/searcApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RegionResponse } from "../../types/region.types";

export default function RegionFilterDropdown() {
  const { t, i18n } = useTranslation();
  const i18nLng = i18n.language; // 현재 언어 코드
  const languageCode = i18nLng === "en" ? "en" : i18nLng === "zh" ? "zh" : "kr";
  const navigate = useNavigate();
  const [region, setRegion] = useAtom(regionFilterAtom); // 선택한 지역 (시,도)
  const { isOpen, setIsOpen, toggle } = useToggle();
  const fallbackRegion = t("Region");

  // 진료과 필터 리스트 api 호출
  const {
    isLoading,
    error,
    data: menus,
  } = useSWR("/hospitals", getRegions, {
    dedupingInterval: 1000 * 60 * 60, // 1시간
  });

  const handleClick = async (menu: RegionResponse) => {
    setRegion(menu[languageCode]);
    toggle();
  };

  useEffect(() => {
    if (error) {
      alert("Failed to load department data");
      navigate("/");
    }
  }, [error]);

  return (
    <>
      {isLoading && <Skeleton width={100} height={31} />}

      {menus && (
        <Dropdown setIsOpen={setIsOpen}>
          <Dropdown.Trigger onClick={toggle}>
            <TriggerWrapper $isSelected={!!region}>
              {region || fallbackRegion}
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
                  $isSelected={menu[languageCode] === region}
                >
                  {menu[languageCode]}
                </MenuItem>
              ))}
            </MenuWrapper>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

const TriggerWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 31px;
  padding: 0 12px;
  border: 1px solid ${theme.colors.white_e5};
  border-radius: 20px;
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
  height: 200px;
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
