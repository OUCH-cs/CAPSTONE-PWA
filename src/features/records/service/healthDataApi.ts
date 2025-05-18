import apiRequest from "@/shared/api/apiRequest";
export interface HealthStatus {
    disease: string;
    allergy: string;
    bloodPressure: number;
    bloodSugar: number;
    medicineHistory: string;
  };





export const getHealthStatus = async () => {
  try {
    const response = await apiRequest({
      url: '/health-status',  
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    console.error("건강기록 전체 조회 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "건강기록을 불러오지 못했습니다.");
  }
};


export const editHealthStatus = async (data: HealthStatus) => {
  try {
    const response = await apiRequest({
      url: '/health-status',
      method: 'PUT',
      data, 
    });

    return response.data;
  } catch (error: any) {
    console.error("건강 상태 수정 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "건강 상태를 저장하지 못했습니다.");
  }
};




