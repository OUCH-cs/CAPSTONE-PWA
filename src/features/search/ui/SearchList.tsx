import styled from "@emotion/styled";
import { SearchPreviewCard } from "./SearchPreviewCard";
import { Place } from "../search.types";
import { LatLng } from "@/features/map/map.types";
import { Link } from "react-router-dom";

interface SearchListProps {
  currLocation: LatLng | null;
  places: Place[];
}

function SearchList({ currLocation, places }: SearchListProps) {
  return (
    <Container>
      {places?.map((place) => (
        <Link to={`/search/${place.id}`} key={place.id}>
          <SearchPreviewCard currLocation={currLocation} {...place} />
        </Link>
      ))}
    </Container>
  );
}

export { SearchList };

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;
  overflow-y: auto;
`;
