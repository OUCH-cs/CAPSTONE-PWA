import styled from "@emotion/styled";
import DropdownMenuIcon from "@/shared/assets/common/arrow.svg?react";
import theme from "@/shared/styles/theme";
import { useAtom, useAtomValue } from "jotai";
import {
  departmentFilterAtom,
  typeFilterAtom,
} from "../../services/store/filterAtom";
import Dropdown from "@/shared/components/dropdown/Dropdown";
import { DepartmentResponse } from "../../types/department.types";
import useToggle from "@/shared/lib/useToggle";
import useSWR from "swr";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import { useEffect } from "react";
import { getDepartments } from "../../services/api/searcApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DepartmentFilterDropdown() {
  const { t, i18n } = useTranslation();
  const i18nLng = i18n.language; // 현재 언어 코드
  const languageCode =
    i18nLng === "en" ? "nameEn" : i18nLng === "zh" ? "nameZh" : "nameKr";
  const navigate = useNavigate();
  const { isOpen, setIsOpen, toggle } = useToggle();
  const fallbackDept = t("Department");

  const [department, setDepartment] = useAtom(departmentFilterAtom); // 선택한 진료과
  const type = useAtomValue(typeFilterAtom); // 선택한 종별코드명

  // 진료과 필터 리스트 api 호출
  const {
    isLoading,
    error,
    data: menus,
  } = useSWR("/hospitals/departments", getDepartments, {
    dedupingInterval: 1000 * 60 * 60, // 1시간
  });

  const handleClick = async (menu: DepartmentResponse) => {
    setDepartment(menu[languageCode]);
    toggle();
  };

  useEffect(() => {
    if (error) {
      alert("Failed to load department data");
      navigate("/");
    }
  }, [error]);

  useEffect(() => {
    return () => {
      setDepartment(null);
    };
  }, []);

  return (
    <>
      {isLoading && <Skeleton width={100} height={31} />}

      {menus && (
        <Dropdown setIsOpen={setIsOpen}>
          <Dropdown.Trigger onClick={toggle}>
            <TriggerWrapper
              $isSelected={!!department}
              disabled={type === "약국"}
            >
              {department || fallbackDept}
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
                  $isSelected={menu[languageCode] === department}
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

const TriggerWrapper = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 31px;
  padding: 0 12px;
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
  width: 172px;
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
