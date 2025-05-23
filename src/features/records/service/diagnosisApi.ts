import apiRequest from "@/shared/api/apiRequest";

// 모든 자가진단 가져오기 (전체 조회)
export const getDiagnosis = async () => {
  try {
    const response = await apiRequest({
      url: "/self-diagnosis",
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// 자가진단 기록 가져오기 (ID로)
export const getDiagnosisById = async (diagnosisId: number) => {
  try {
    
    const response = await apiRequest({
      url: `/self-diagnosis/${diagnosisId}`,
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// 자가진단 삭제하기 (ID로)
export const deleteDiagnosis = async (diagnosisId: number) => {
  try {
    const response = await apiRequest({
      url: `/self-diagnosis/${diagnosisId}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
