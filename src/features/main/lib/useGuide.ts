import { useGetGuideCategories } from "./useGuideCategories";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { selectedCategoriesAtom } from "../service/guideAtoms";
import { languageCodeAtom } from "@/shared/services/languageCodeAtom";

export const useGuideCategories = () => {
    const [languageCode] = useAtom(languageCodeAtom)
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