import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import HomeCamera from "@/shared/assets/home/HomeCamera.svg?react";
import HomeGuide from "@/shared/assets/home/HomeGuide.svg?react";
import HomeActionButton from "@/features/main/ui/HomeActionButton";
import HomeDiagnosisCard from "@/features/main/ui/DiagnosisCard";
import MainHeader from "@/features/main/ui/MainHeader";
import { fallbackLocaton } from "@/shared/consts/common";
import { useNearbySearch } from "@/features/search/services/useNearbySearch";
import { SearchList } from "@/features/search/ui";
import Skeleton from "@/shared/components/skeleton/Skeleton";

function MainPage() {
  const currLocation = fallbackLocaton; // 임시 위치 설정 하드코딩
  const { isPending, isSuccess, places } = useNearbySearch(currLocation); // 근처 병원 검색

  return (
    <Container>
      <MainHeader />
      <HomeDiagnosisCard />
      <ButtonContainer>
        <HomeActionButton
          icon={<HomeCamera width={29} height={29} />}
          label="Text translation"
        />
        <HomeActionButton
          icon={<HomeGuide width={29} height={28} />}
          label="OUCH guide"
          selected
        />
      </ButtonContainer>

      {isPending && (
        <SkeletonWrapper>
          <Skeleton width={185} height={21} />
        </SkeletonWrapper>
      )}

      {isSuccess && (
        <RecommendationTitle>Recommended Hospital</RecommendationTitle>
      )}

      {isPending && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={236} height={152} />
          ))}
        </SkeletonList>
      )}

      {/* 검색결과 렌더링 */}
      {isSuccess && <SearchList currLocation={currLocation} places={places} />}
    </Container>
  );
}

export { MainPage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  padding: 0 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 4.3rem;
`;

const RecommendationTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 1rem;
  color:'#000;
`;

const SkeletonWrapper = styled.div`
  margin-bottom: 1rem;
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 50px;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
