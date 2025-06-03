import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getDetailInfo } from "@/features/search/services/api/searcApi";
import DetailInfoSection from "@/widgets/search/DetailInfoSection";
import { SearchDetailHeader } from "@/features/search/ui";
import { useTranslation } from "react-i18next";
import ReviewSection from "@/widgets/search/ReviewSection";

type TabKey = "Info" | "Review";

export default function SearchDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [activetab, setActiveTab] = useState<TabKey>("Info");

  const { data, error } = useSWR(`/hospitals/${id}`, getDetailInfo, {
    dedupingInterval: 1000 * 60 * 60, // 1시간
  });

  // 에러 예외 처리
  useEffect(() => {
    if (error) {
      alert("An error occurred while fetching the data.");
      navigate(-1);
    }
  }, [error]);

  return (
    <>
      <Container>
        {data && <SearchDetailHeader>{data.name}</SearchDetailHeader>}
        <TabHeader>
          <TabButton
            onClick={() => setActiveTab("Info")}
            $isSelected={activetab === "Info"}
          >
            {t("Info")}
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("Review")}
            $isSelected={activetab === "Review"}
          >
            {t("Review")}
          </TabButton>
        </TabHeader>

        <ContentWrapper>
          {data && activetab === "Info" && <DetailInfoSection data={data} />}
          {data && activetab === "Review" && <ReviewSection data={data} />}
        </ContentWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh-60px);
`;

const TabHeader = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  margin-bottom: 32px;
`;

const TabButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.black : theme.colors.gray_7};
  background-color: transparent;
  border-bottom: 1px solid
    ${({ $isSelected, theme }) => ($isSelected ? theme.colors.black : "none")};
  cursor: pointer;
`;

const ContentWrapper = styled.div``;
