import styled from "@emotion/styled";
import { SearchPreviewCard } from "./SearchPreviewCard";
import { Place } from "../search.types";
import { LatLng } from "@/features/map/map.types";

interface SearchListProps {
  currLocation: LatLng | null;
  places: Place[];
}

function SearchList({ currLocation, places }: SearchListProps) {
  return (
    <Container>
      {places?.map((place) => (
        <SearchPreviewCard
          key={place.id}
          currLocation={currLocation}
          {...place}
        />
      ))}
    </Container>
  );
}

export { SearchList };

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;
