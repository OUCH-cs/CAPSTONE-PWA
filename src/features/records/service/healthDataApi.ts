import apiRequest from "@/shared/api/apiRequest";
export interface HealthStatus {
    id?: string; // 수정 시를 고려해 optional
    disease: string;
    allergy: string;
    bloodPressure: string;
    bloodSugar: string;
    medicineHistory: string;
    // 필요한 경우 추가 필드 여기에 정의
  }




export const getHealthStatus = async () => {
  try {
    const response = await apiRequest({
      url: '/health-status',  // 전체 URL
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    console.error("건강기록 전체 조회 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "건강기록을 불러오지 못했습니다.");
  }
};



