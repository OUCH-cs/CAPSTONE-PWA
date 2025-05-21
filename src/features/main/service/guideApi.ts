import apiRequest from "@/shared/api/apiRequest";
import { GuideQnA } from "../guide.type";

export const getGuideCategories = async (
    languageCode: string
) : Promise<string[]> => {
    const response = await apiRequest({
        url: `/guide/ouch/categories?languageCode=${languageCode}`,
        method: "GET",
    })
    return response.data;
}


export const getGuideQustion = async (
    category: string,
    languageCode: string
) : Promise<GuideQnA[]> => {
    const response = await apiRequest({
        url: `/guide/ouch/filter?category=${encodeURIComponent(category)}&languageCode=${languageCode}`,
        method: "GET",
    })
    return response.data;
}
