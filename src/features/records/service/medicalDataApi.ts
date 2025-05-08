import apiRequest from "@/shared/api/apiRequest";

// ✅ 공통 URL 상수
const BASE_URL = "/medical-record";

// ✅ 병원 기록 타입 정의
export interface HospitalRecord {
  id?: string; // 수정 시를 고려해 optional
  visitDate: string;
  visitingHospital: string;
  medicalSubject: string;
  symptoms: string;
  treatmentSummary: string;
  // 필요한 경우 추가 필드 여기에 정의
}

// ✅ ID로 의료 기록 가져오기 (단건 조회)
export const getMedicalRecordById = async (id: string) => {
  try {
    const response = await apiRequest({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    console.error("의료기록 조회 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "의료기록 조회에 실패했습니다.");
  }
};

// ✅ 모든 의료 기록 가져오기 (전체 조회)
export const getHospitals = async () => {
  try {
    const response = await apiRequest({
      url: BASE_URL,
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    console.error("의료기록 전체 조회 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "의료기록을 불러오지 못했습니다.");
  }
};

// ✅ 의료기록 추가하기 (등록)
export const addHospital = async (hospitalData: HospitalRecord) => {
  try {
    const response = await apiRequest({
      url: BASE_URL, // 수정된 부분
      method: "POST",
      data: hospitalData,
    });
    return response.data;
  } catch (error: any) {
    console.error("의료기록 추가 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "의료기록 추가에 실패했습니다.");
  }
};

// ✅ 의료기록 수정하기 (업데이트)
export const editHospitals = async (id: string, updatedData: HospitalRecord) => {
  try {
    const response = await apiRequest({
      url: `${BASE_URL}/${id}`, // id를 URL에 포함하여 업데이트
      method: "PUT",
      data: updatedData, // 수정할 데이터 전송
    });
    return response.data;
  } catch (error: any) {
    console.error("의료기록 수정 중 오류:", error?.response || error);
    throw new Error(error?.response?.data?.message || "의료기록을 수정하지 못했습니다.");
  }
};
