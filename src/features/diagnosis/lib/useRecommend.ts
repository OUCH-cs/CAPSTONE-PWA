import { useEffect, useState } from "react";
import { RecommendRequest } from "../diagnosis.type";
import { postRecommend } from "../service/api";
import { AxiosResponse } from "axios";

export const useRecommend = (data: RecommendRequest | null) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!data) return;

    const fetch = async () => {
      try {
        const res = await postRecommend(data);
        alert("Successfully submitted!");
        console.log(res.data);
        setResponse(res); // ✅ 리스폰스 저장
      } catch (e) {
        if (e instanceof Error) {
          alert(`Submission failed: ${e.message}`);
          setError(e);
        } else {
          alert("Submission failed due to an unknown error.");
        }
      }
    };

    fetch();
  }, [data]);

  return { response, error };
};