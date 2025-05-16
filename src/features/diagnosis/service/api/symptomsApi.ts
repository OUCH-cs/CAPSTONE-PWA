import apiRequest from "@/shared/api/apiRequest";

export const getSystems = async () : Promise<string[]> => {
    const response = await apiRequest({
        url: "/diagnosis-algorithm/systems?languageCode=en",
        method: "GET",
    })
    return response.data;
}


export const getSymptoms = async (
    system: string,
    languageCode: string = "en"
) : Promise<string[]> => {
    const response = await apiRequest({
        url: `/diagnosis-algorithm/symptoms?system=${system}&languageCode=${languageCode}`,
        method: "GET",
    })
    return response.data;
}


