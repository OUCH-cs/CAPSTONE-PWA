import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import HomeCamera from "@/shared/assets/home/HomeCamera.svg?react";
import HomeGuide from "@/shared/assets/home/HomeGuide.svg?react";
import HomeActionButton from "@/features/main/ui/HomeActionButton";
import HomeDiagnosisCard from "@/features/main/ui/DiagnosisCard";
import MainHeader from "@/features/main/ui/MainHeader";
import { fallbackLocaton } from "@/shared/consts/common";
import { SearchList } from "@/features/search/ui";
import Skeleton from "@/shared/components/skeleton/Skeleton";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { getLanguage } from "@/shared/api/languageApi";
import { languageCodeAtom } from "@/shared/services/languageCodeAtom";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetchNearbySearch } from "@/features/search/services/api/searcApi";
import { useTranslation } from "react-i18next";

function MainPage() { ;
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [languageCode, setLanguageCode] = useAtom(languageCodeAtom); //전역으로 사용자 언어 관리
  const currLocation = fallbackLocaton; // 임시 위치 설정 하드코딩

  // 근처 병원 검색 API 호출
  const { isLoading, data } = useSWR(
    "/hospitals/search",
    (url) => fetchNearbySearch(url, currLocation, 10),
    {
      dedupingInterval: 1000 * 60 * 60, // 1시간
    }
  );

  // 메인페이지 렌더링 시 사용자 언어 초기화
  useEffect(() => {
    if (languageCode) return;

    getLanguage()
      .then((code) => setLanguageCode(code))
      .catch(() => setLanguageCode("en"));
  }, [languageCode, setLanguageCode]);

  return (
    <Container>
      <MainHeader />
      <HomeDiagnosisCard />
      <ButtonContainer>
        <HomeActionButton
          icon={<HomeCamera width={29} height={29} />}
          label={t("Text translation")}
        />
        <HomeActionButton
          onClick={() => {
            navigate("/guide");
          }}
          icon={<HomeGuide width={29} height={28} />}
          label={t("OUCH guide")}
          selected
        />
      </ButtonContainer>

      {isLoading && (
        <SkeletonWrapper>
          <Skeleton width={185} height={21} />
        </SkeletonWrapper>
      )}
      {data && <RecommendationTitle>{t("Recommended Hospital")}</RecommendationTitle>}

      {isLoading && (
        <SkeletonList>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`notice-skeleton-${idx}`} width={236} height={152} />
          ))}
        </SkeletonList>
      )}
      {/* 검색결과 렌더링 */}
      {data && <SearchList currLocation={currLocation} places={data} />}
    </Container>
  );
}

export { MainPage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  color: "#000";
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
