import apiRequest from "@/shared/api/apiRequest";

export const getConditions = async (
    system: string,
    symptom:string,
    languageCode: string,
)  => {
    const response = await apiRequest({
        url: `/diagnosis-algorithm/conditions?languageCode=${languageCode}&system=${encodeURIComponent(system)}&symptom=${encodeURIComponent(symptom)}`,
        method: "GET",
    })
    return response.data;
}


export const getAlgorithm= async () => {
    const response = await apiRequest({
        url: "/diagnosis-algorithm",
        method: "GET",
    })
    return response.data;
}