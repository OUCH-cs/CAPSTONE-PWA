import apiRequest from "@/shared/api/apiRequest";
import { DiagnosisResponse, DiagnosisFormData} from "../../diagnosis.type";

export const getUserDiagnosis = async (userId: number): Promise<DiagnosisResponse[]> => {
  const response = await apiRequest({
    url: `/self-diagnosis/get-all/${userId}`,
    method: "GET",
  });

  return response.data;
};

export const postDiagnosis = async ( formData : DiagnosisFormData ) => {
  return apiRequest({
    url: "self-diagnosis",
    method: "POST",
    data: formData,
  });
};

export const deleteDiagnosis = async (diagnosisId: number): Promise<string> => {
  const response = await apiRequest({
    url: `/self-diagnosis/${diagnosisId}`,
    method: "DELETE",
  });

  return response.data.message; 
};