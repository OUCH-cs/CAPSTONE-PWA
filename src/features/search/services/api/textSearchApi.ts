import { Place, TextSearchRequest } from "../../search.types";
import searchQuery from "./searchQuery";

// 단일 타입 텍스트 검색 요청 (병원 또는 약국)
export const fetchTextSearchByType = async (
  requestData: TextSearchRequest,
  includedType: string,
  setData?: React.Dispatch<React.SetStateAction<Place[]>>
) => {
  const response = await searchQuery({
    url: ":searchText",
    method: "POST",
    data: { ...requestData, includedType },
  });

  if (setData) setData(response.data.places || []);

  return response.data.places || [];
};

// 병원 + 약국 통합 검색 요청
export const fetchMergedTextSearchResults = async (
  requestData: TextSearchRequest,
  setData?: React.Dispatch<React.SetStateAction<Place[]>>
) => {
  const [hospitalResults, pharmacyResults] = await Promise.all([
    fetchTextSearchByType(requestData, "hospital", setData),
    fetchTextSearchByType(requestData, "pharmacy", setData),
  ]);

  return [...(hospitalResults || []), ...(pharmacyResults || [])];
};
