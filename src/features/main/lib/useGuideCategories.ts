import useSWR from "swr";
import { getGuideCategories,getGuideQustion } from "../service/guideApi";
import { GuideQnA } from "../guide.type";

export const useGetGuideCategories = (
    languageCode: string 
) => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        ['/guidecategories', languageCode], 
        () => getGuideCategories(languageCode) 
    );    

    return {
        guideCategories: data,
        isLoading,
        isError: error,
        mutate,
      };
}

export const useGetGuideQustion = (
    category: string,
    languageCode: string
  ) => {
    const shouldFetch = !!category && category !== "" && languageCode !== "";
  
    const { data, error, isLoading, mutate } = useSWR<GuideQnA[]>(
      shouldFetch ? ['/categories', category, languageCode] : null,
      () => getGuideQustion(category, languageCode)
    );
  
    return {
      data,
      isLoading,
      isError: error,
      mutate,
    };
  };