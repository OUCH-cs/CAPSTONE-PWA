import styled from "@emotion/styled";
import { Searchbar, SearchList } from "@/features/search/ui";
import { fallbackLocaton } from "@/shared/consts/common";
import SortDropdown from "@/features/search/ui/dropdown/SortDropdown";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import useSWR from "swr";
import { fetchNearbySearch } from "@/features/search/services/api/searcApi";
import { NearbyPlacesResponse } from "@/features/search/types/search.types";
import { useAtomValue } from "jotai";
import {
  departmentFilterAtom,
  searchTypeAtom,
} from "@/features/search/services/store/filterAtom";
import NoSearchResults from "@/features/search/ui/NoSearchResults";
import MapIcon from "@/shared/assets/map/map.svg?react";
import { FloatingButton } from "@/shared/components/button/FloatingButton";

function SearchPage() {
  const currLocation = fallbackLocaton; // 임시 위치 설정 하드코딩

  const department = useAtomValue(departmentFilterAtom); // 진료과 필터 상태
  const type = useAtomValue(searchTypeAtom); // 진료과 필터 상태

  // 병원 검색 API 호출 (초기 검색 호출은 현재 위치 기준으로 근처 병원 검색)
  // 진료과나 종별코드명을 검색 입력 시에도 호출
  const {
    isLoading,
    error,
    data: nearbyPlaces,
  } = useSWR(
    ["/hospitals/search", department, type],
    ([url, dept, type]) => fetchNearbySearch(url, currLocation, 20, dept, type),
    {
      dedupingInterval: 1000 * 60 * 60, // 1시간
    }
  );

  return (
    <Container>
      {/* 검색바 */}
      <Searchbar />

      {/* 정렬 드롭다운 */}
      <SortDropdown />

      {isLoading && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={328} height={170} />
          ))}
        </SkeletonList>
      )}

      {error && <div>Error!!</div>}

      {nearbyPlaces && nearbyPlaces.length === 0 && <NoSearchResults />}

      {/* 검색결과 렌더링 */}
      <SearchList
        currLocation={currLocation}
        // 구글 맵 없애기 전까지 임시로 타입 확언
        places={nearbyPlaces as NearbyPlacesResponse[]}
      />

      {/* 지도 라우팅 플로팅 버튼 */}
      <FloatingButton
        text="View Map"
        icon={<MapIcon />}
        to="/map"
        width="120px"
        height="46px"
      />
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
