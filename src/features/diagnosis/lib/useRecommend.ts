import { useEffect, useState } from "react";
import { RecommendRequest } from "../diagnosis.type";
import { postRecommend } from "../service/api";
import { AxiosResponse } from "axios";

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