import apiRequest from "@/shared/api/apiRequest";

export const getSymptoms = async () : Promise<string[]> => {
    const response = await apiRequest({
        url: "/diagnosis-algorithm/systems?languageCode=en",
        method: "GET",
    })
    return response.data;
}