import apiRequest from "@/shared/api/apiRequest";



export interface HospitalRecord {
  id?: string; 
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
      url: `/medical-record/${id}`,
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
      url: "/medical-record",
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
      url: "/medical-record" ,
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

// 의료기록 수정하기
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