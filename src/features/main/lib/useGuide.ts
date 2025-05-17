import { useGetGuideCategories } from "./useGuideCategories";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedCategoriesAtom } from "../service/guideAtoms";

export const useGuideCategories = () => {
    const { guideCategories = [], isLoading } = useGetGuideCategories();
  
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