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
    categories: string, languageCode: string
) => {
    const { data, error, isLoading, mutate } = useSWR<GuideQnA[]>(
        ['/categories', categories, languageCode], 
        () => getGuideQustion(categories, languageCode) 
    );    

    return {
        data: data,
        isLoading,
        isError: error,
        mutate,
      };

}