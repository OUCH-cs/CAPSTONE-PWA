import apiRequest from "@/shared/api/apiRequest";
import { DiagnosisAlgorithm } from "../../diagnosis.type";

export const getConditions = async (
    system: string,
    symptom:string,
    languageCode: string = "en"
) : Promise<string[]> => {
    const response = await apiRequest({
        url: `/diagnosis-algorithm/conditions?languageCode=${languageCode}&system=${encodeURIComponent(system)}&symptom=${encodeURIComponent(symptom)}`,
        method: "GET",
    })
    return response.data;
}


export const getAlgorithm= async () : Promise<DiagnosisAlgorithm[]> => {
    const response = await apiRequest({
        url: "/diagnosis-algorithm",
        method: "GET",
    })
    return response.data;
}