import apiRequest from "@/shared/api/apiRequest";

// 전체 정보 가져오기
export const getInformation = async () => {
  try {
    const response = await apiRequest({
      url: "/mypage/profile",
      method: "GET",
    });
    return response.data; 
  } catch (error: any) {
    console.error("getInformation error:", error);
    return null;
  }
};

// 정보 수정
export const editInformation = async (payload: {
  nickname: string;
  gender: "MALE" | "FEMALE";
  nationCode: string;       
  phoneNumber: string;
  email: string;
  languageCode: string;     
}) => {
  try {
    const response = await apiRequest({
      url: "/mypage/profile",
      method: "PUT",
      data: payload,
    });
    return response.data;
  } catch (error: any) {
    console.error("editInformation error:", error);
    return null;
  }
};

