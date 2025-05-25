import styled from "@emotion/styled";
import { SearchPreviewCard } from "./SearchPreviewCard";
import { NearbyPlacesResponse } from "../types/search.types";
import { Link, useLocation } from "react-router-dom";
import { LatLng } from "@/shared/types/common";

interface SearchListProps {
  currLocation: LatLng | null;
  places: NearbyPlacesResponse[];
}

function SearchList({ currLocation, places }: SearchListProps) {
  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search");

  return (
    <Container $isSearchPage={isSearchPage}>
      {places?.map((place) => (
        <Link to={`/search/${place.ykiho}`} key={place.ykiho}>
          <SearchPreviewCard currLocation={currLocation} {...place} />
        </Link>
      ))}
    </Container>
  );
}

export { SearchList };

const Container = styled.ul<{ $isSearchPage: boolean }>`
  display: flex;
  flex-direction: ${({ $isSearchPage }) => ($isSearchPage ? "column" : "row")};
  gap: 12px;
  margin-bottom: 50px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
