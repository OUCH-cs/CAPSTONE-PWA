import styled from "@emotion/styled";
import { useTextSearch } from "@/features/search/services/useTextSearch";
import { Searchbar, SearchList } from "@/features/search/ui";
import { fallbackLocaton } from "@/shared/consts/common";
import SortDropdown from "@/features/search/ui/dropdown/SortDropdown";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import useSWR from "swr";
import { fetchNearbySearch } from "@/features/search/services/api/searcApi";
import { NearbyPlacesResponse } from "@/features/search/types/search.types";
// import { useCurrLocation } from "@/shared/services/useCurrLocation";

function SearchPage() {
  // const currLocation = useCurrLocation(); // 현재 위치 가져오기 버그로 인한..
  const currLocation = fallbackLocaton; // 임시 위치 설정 하드코딩

  // 근처 병원 검색 API 호출
  const {
    isLoading,
    error,
    data: nearbyPlaces,
  } = useSWR(
    "/hospitals/search",
    (url) => fetchNearbySearch(url, currLocation, 20),
    {
      dedupingInterval: 1000 * 60 * 60, // 1시간
    }
  );

  const {
    isPending: isTextSearchPending,
    isSuccess: isTextSearchSuccess,
    isError: isTextSearchError,
    data: textSearchData,
  } = useTextSearch(); // 텍스트 검색

  // 근처 검색 결과는 초기 렌더링시에만 (검색시도가 한번도 안된 경우)
  const shouldRenderNearby =
    !isTextSearchPending &&
    !isTextSearchSuccess &&
    !isTextSearchError &&
    nearbyPlaces;

  const renderData = shouldRenderNearby ? nearbyPlaces : textSearchData;

  return (
    <Container>
      {/* 검색바 */}
      <Searchbar />

      {/* 정렬 드롭다운 */}
      <SortDropdown />

      {(isLoading || isTextSearchPending) && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={328} height={170} />
          ))}
        </SkeletonList>
      )}

      {(error || isTextSearchError) && <div>Error!!</div>}

      {isTextSearchSuccess && textSearchData.length === 0 && (
        <div>검색 결과가 없습니다.</div>
      )}

      {/* 검색결과 렌더링 */}
      {(shouldRenderNearby || isTextSearchSuccess) && (
        <SearchList
          currLocation={currLocation}
          // 구글 맵 없애기 전까지 임시로 타입 확언
          places={renderData as NearbyPlacesResponse[]}
        />
      )}
    </Container>
  );
}

export { SearchPage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;
  overflow-y: auto;
`;
