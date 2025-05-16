import { useAtom } from "jotai";
import { TextSearchRequest } from "../search.types";
import searchQuery from "../services/api/searchQuery";
import {
  isTextQueryError,
  isTextQueryPending,
  isTextQuerySuccess,
  searchQueryAtomResults,
  textQueryAtom,
} from "./store/searchQueryAtom";
import { useEffect } from "react";

const useTextSearch = () => {
  const [data, setData] = useAtom(searchQueryAtomResults);
  const [textQuery, setTextQuery] = useAtom(textQueryAtom); // 입력 검색어
  const [isPending, setIsPending] = useAtom(isTextQueryPending);
  const [isSuccess, setIsSuccess] = useAtom(isTextQuerySuccess);
  const [isError, setIsError] = useAtom(isTextQueryError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestData: TextSearchRequest = {
      textQuery,
      languageCode: "en",
    };

    try {
      setIsPending(true);

      // 검색어 요청 API 호출
      const [hospitalResults, pharmacyResults] = await Promise.all([
        searchQuery({
          url: ":searchText",
          method: "POST",
          data: { ...requestData, includedType: "hospital" }, // 병원 검색
        }),
        searchQuery({
          url: ":searchText",
          method: "POST",
          data: { ...requestData, includedType: "pharmacy" }, // 약국 검색
        }),
      ]);

      // 병원과 약국 검색 결과 병합
      const mergedResults = [
        ...(hospitalResults.data.places || []),
        ...(pharmacyResults.data.places || []),
      ];

      setData(mergedResults || []);

      setIsSuccess(true);
      setIsError(false);
    } catch (error) {
      console.error("검색 에러 발생", error);
      setIsSuccess(false);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  // 마운트 시 초기화
  useEffect(() => {
    setTextQuery("");
    setData([]);
    setIsPending(false);
    setIsSuccess(false);
    setIsError(false);
  }, []);

  return {
    textQuery,
    handleChange,
    handleSubmit,
    isPending,
    isSuccess,
    data,
    isError,
  };
};

export { useTextSearch };
