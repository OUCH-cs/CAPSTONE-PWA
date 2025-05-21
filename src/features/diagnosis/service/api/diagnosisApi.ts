import apiRequest from "@/shared/api/apiRequest";
import { DiagnosisFormData } from "../../diagnosis.type";

export const postDiagnosis = async ( formData : DiagnosisFormData ) => {
  return apiRequest({
    url: "self-diagnosis",
    method: "POST",
    data: formData,
  });
};