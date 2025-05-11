import apiRequest from "@/shared/api/apiRequest";
export interface HealthStatus {
    disease: string;
    allergy: string;
    bloodPressure: number;
    bloodSugar: number;
    medicineHistory: string;
    // 필요한 경우 추가 필드 여기에 정의
  };





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

// healthDataApi.ts
export const editHealthStatus = async (data: HealthStatus) => {
  try {
    const response = await apiRequest({
      url: '/health-status',
      method: 'PUT',
      data, // 이미 숫자 조합 완료된 상태여야 함
    });

    return response.data;
  } catch (error: any) {
    console.error("건강 상태 수정 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "건강 상태를 저장하지 못했습니다.");
  }
};





