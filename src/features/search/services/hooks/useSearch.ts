import { useAtom, useSetAtom } from "jotai";
import {
  departmentFilterAtom,
  searchQueryAtom,
  searchTypeAtom,
} from "../../services/store/filterAtom";
import { DEPARTMENT_NAMES_EN, DEPARTMENT_NAMES_KR } from "../../search.consts";
import {
  AllDepartments,
  DepartmentNameByLang,
} from "../../types/department.types";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const setDepartment = useSetAtom(departmentFilterAtom);
  const setType = useSetAtom(searchTypeAtom);

  // 진료과명 유효성 검사
  const isValidDepartment = (query: string): boolean => {
    return (
      DEPARTMENT_NAMES_KR.includes(query as DepartmentNameByLang<"kr">) ||
      DEPARTMENT_NAMES_EN.includes(query as DepartmentNameByLang<"en">)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    // 이전 입력값 초기화
    setDepartment(null);
    setType(null);

    if (isValidDepartment(searchQuery))
      setDepartment(searchQuery as AllDepartments);
    else if (searchQuery === "병원" || searchQuery === "약국") {
      setType(searchQuery);
    } else {
      // 유효하지 않은 입력 처리
      setType("dummy" as any);
    }

    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSubmit,
  };
}
