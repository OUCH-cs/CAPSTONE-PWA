import { useEffect, useState } from "react";
import { RecommendRequest } from "../diagnosis.type";
import { postRecommend } from "../service/api";
import { AxiosResponse } from "axios";


/**
 * 증상 기반 병원 추천 API 호출을 수행하는 커스텀 훅입니다.
 *
 * - RecommendRequest 데이터가 전달되면 자동으로 API 요청을 보냅니다.
 * - 요청 상태(로딩, 성공 응답, 에러)를 관리합니다.
 *
 * @param data RecommendRequest | null - 추천 요청에 사용할 데이터 (없으면 호출하지 않음)
 * @returns {
*   response: Axios 응답 객체 (성공 시),
*   isLoading: 로딩 중 여부,
*   error: 에러 객체 (실패 시)
* }
*/

export const useRecommend = (data: RecommendRequest | null) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (!data) return;

    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await postRecommend(data);
        setResponse(res); 
      } catch (e) {
        if (e instanceof Error) {
          alert(`Submission failed: ${e.message}`);
          setError(e);
        } else {
          alert("Submission failed due to an unknown error.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [data]);

  return { response, isLoading, error };
};