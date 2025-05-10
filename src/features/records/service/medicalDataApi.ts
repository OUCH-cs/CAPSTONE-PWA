import apiRequest from "@/shared/api/apiRequest";

const BASE_URL = "/medical-record";


export interface HospitalRecord {
  id?: string; // 수정 시를 고려해 optional
  visitDate: string;
  visitingHospital: string;
  medicalSubject: string;
  symptoms: string;
  treatmentSummary: string;

}

// ID로 의료 기록 가져오기 (단건 조회)
export const getMedicalRecordById = async (id: string) => {
  try {
    const response = await apiRequest({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
  }
};

// 모든 의료 기록 가져오기 (전체 조회)
export const getHospitals = async () => {
  try {
    const response = await apiRequest({
      url: BASE_URL,
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
  }
};

// 의료기록 추가하기 
export const addHospital = async (hospitalData: HospitalRecord) => {
  try {
    const response = await apiRequest({
      url: BASE_URL, 
      method: "POST",
      data: hospitalData,
    });
    return response.data;
  } catch (error: any) {
  }
};

//  의료기록 삭제하기 
export const deleteHospitals = async (medicalRecordId: string) => {
  try {
    const response = await apiRequest({
      url: `/medical-record/${medicalRecordId}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error: any) {
  }
};

// 의료기혹 수정하기
export const editHospitals = async (id: string, data: HospitalRecord) => {
  try {
    const response = await apiRequest({
      url: `/medical-record/${id}`,
      method: "PUT",
      data,
    });
    return response.data;
  } catch (error: any) {
  }
};