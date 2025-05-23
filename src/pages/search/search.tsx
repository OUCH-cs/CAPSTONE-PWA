import styled from "@emotion/styled";
import { useNearbySearch } from "@/features/search/services/useNearbySearch";
import { useTextSearch } from "@/features/search/services/useTextSearch";
import { Searchbar, SearchList } from "@/features/search/ui";
import { fallbackLocaton } from "@/shared/consts/common";
import SortDropdown from "@/features/search/ui/dropdown/SortDropdown";
import useToggle from "@/shared/lib/useToggle";
import Skeleton from "@/shared/components/skeleton/Skeleton";
// import { useCurrLocation } from "@/shared/services/useCurrLocation";

function SearchPage() {
  // const currLocation = useCurrLocation(); // 현재 위치 가져오기 버그로 인한..
  const currLocation = fallbackLocaton; // 임시 위치 설정 하드코딩

  const { isOpen, setIsOpen, toggle } = useToggle(); // 필터 드롭다운 토글

  const {
    isPending: isNearbyPending,
    isSuccess: isNearbySuccess,
    isError: isNearbyError,
    places: nearbyData,
  } = useNearbySearch(currLocation); // 근처 병원 검색

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
    isNearbySuccess;

  const renderData = shouldRenderNearby ? nearbyData : textSearchData;

  return (
    <Container>
      {/* 검색바 */}
      <Searchbar />

      {/* 정렬 드롭다운 */}
      <SortDropdownWrapper>
        <SortDropdown
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggle={toggle}
          menus={["Recommended", "Distance"]}
        />
      </SortDropdownWrapper>

      {(isNearbyPending || isTextSearchPending) && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={328} height={170} />
          ))}
        </SkeletonList>
      )}

      {(isNearbyError || isTextSearchError) && <div>Error!!</div>}

      {isTextSearchSuccess && textSearchData.length === 0 && (
        <div>검색 결과가 없습니다.</div>
      )}

      {/* 검색결과 렌더링 */}
      {(shouldRenderNearby || isTextSearchSuccess) && (
        <SearchList currLocation={currLocation} places={renderData} />
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

const SortDropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 328px;
  margin-bottom: 16px;
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;
  overflow-y: auto;
`;
