import ContactFavoritePanel from "@/entities/search/ui/detail/ContactFavoritePanel";
import SearchDetailInfo from "@/entities/search/ui/detail/SearchDetailInfo";
import { SearchDetailResponse } from "@/features/search/types/search.types";
import styled from "@emotion/styled";
import MiniMap from "../MiniMap";

export default function DetailInfoSection({
  data,
}: {
  data: SearchDetailResponse;
}) {
  return (
    <Container>
      <SearchDetailInfo {...data} />
      <ContactFavoritePanel tel={data.tel} />
      <MiniMap lat={data.lat} lng={data.lng} data={data} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
