import { useAtom, useAtomValue } from "jotai";
import { TextSearchRequest } from "../search.types";
import {
  isTextQueryError,
  isTextQueryPending,
  isTextQuerySuccess,
  searchQueryAtomResults,
  textQueryAtom,
} from "./store/searchQueryAtom";
import { useEffect } from "react";
import { departmentFilterAtom, sortFilterAtom } from "./store/filterAtom";
import {
  fetchMergedTextSearchResults,
  fetchTextSearchByType,
} from "./api/textSearchApi";

const useTextSearch = () => {
  const department = useAtomValue(departmentFilterAtom); // department 필터링
  const sort = useAtomValue(sortFilterAtom); // sort 필터링

  const [data, setData] = useAtom(searchQueryAtomResults);
  const [textQuery, setTextQuery] = useAtom(textQueryAtom); // 입력 검색어
  const [isPending, setIsPending] = useAtom(isTextQueryPending);
  const [isSuccess, setIsSuccess] = useAtom(isTextQuerySuccess);
  const [isError, setIsError] = useAtom(isTextQueryError);

  const requestData: TextSearchRequest = {
    textQuery,
    languageCode: "en",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsPending(true);

      const results = await fetchMergedTextSearchResults(requestData);

      setData(results);

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

  // 추천순, 거리순 필터링
  useEffect(() => {
    if (!textQuery) return;

    const rankPreference = sort === "Recommended" ? "RELEVANCE" : "DISTANCE";

    fetchMergedTextSearchResults({ ...requestData, rankPreference }, setData);
  }, [sort]);

  // 병원, 약국 필터링
  useEffect(() => {
    if (!textQuery) return;

    if (department === "Hospital") {
      fetchTextSearchByType(requestData, "hospital", setData);
    } else if (department === "Pharmacy") {
      fetchTextSearchByType(requestData, "pharmacy", setData);
    }
  }, [department]);

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
