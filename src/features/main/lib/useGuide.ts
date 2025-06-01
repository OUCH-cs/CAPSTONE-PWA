import { useGetGuideCategories } from "./useGuideCategories";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedCategoriesAtom } from "../service/guideAtoms";
import { useLanguage } from "@/shared/services/useLanguage";

/**
 * 가이드 카테고리를 관리하는 커스텀 훅입니다.
 *
 * - 현재 언어 코드에 따라 카테고리 목록을 불러옵니다.
 * - 전역 상태로 선택된 카테고리를 저장 및 관리합니다.
 * - 선택된 카테고리를 변경할 수 있는 toggle 함수를 제공합니다.
 *
 * @returns {
*  selectedCategories: 현재 선택된 카테고리 (string),
*  allCategories: 전체 카테고리 목록 (string[]),
*  toggleCategories: 카테고리를 변경하는 함수,
*  isLoading: 카테고리 로딩 상태
* }
*/


export const useGuideCategories = () => {
    const {languageCode} =useLanguage();
    const { guideCategories = [], isLoading } = useGetGuideCategories(languageCode);
    const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  
    useEffect(() => {
      if (guideCategories.length > 0 && !selectedCategories) {
        setSelectedCategories(guideCategories[0]); 
      }
    }, [guideCategories, selectedCategories, setSelectedCategories]);
  
    const toggleCategories = (categories: string) => {
        setSelectedCategories(categories);
    };
  
    return {
      selectedCategories,
      allCategories: guideCategories,
      toggleCategories,
      isLoading,
    };
  };