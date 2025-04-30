import apiRequest from "@/shared/api/apiRequest";
import { DiagnosisResponse } from "@/features/diagnosis/diagnosis.type";

export const getDiagnosisList = async () : Promise<DiagnosisResponse[]> => {
    const response = await apiRequest({
        url: "/self-diagnosis",
        method: "GET"
    })
    return response.data.data;
}