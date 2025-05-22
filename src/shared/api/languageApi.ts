import apiRequest from "@/shared/api/apiRequest";

export const getLanguage = async () => {
    const response = await apiRequest({
        url: "/users/languages",
        method: "GET",
    })
    
    return response.data.data.code;

}