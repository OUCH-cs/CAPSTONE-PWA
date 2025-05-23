import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { SearchDetailHeader } from "@/features/search/ui";
import { useEffect } from "react";
import SearchDetailInfo from "@/features/search/ui/detail/SearchDetailInfo";
import ContactFavoritePanel from "@/features/search/ui/detail/ContactFavoritePanel";
import { getDetailInfo } from "@/features/search/services/api/searcApi";

export default function SearchDetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, error } = useSWR(`/hospitals/${id}`, getDetailInfo, {
    dedupingInterval: 1000 * 60 * 60, // 1시간
  });

  console.log(data);

  // 에러 예외 처리
  useEffect(() => {
    if (error) {
      alert("An error occurred while fetching the data.");
      navigate(-1);
    }
  }, [error]);

  return (
    <>
      {data && (
        <Container>
          <SearchDetailHeader>{data.name}</SearchDetailHeader>
          <SearchDetailInfo {...data} />
          <ContactFavoritePanel tel={data.tel} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
