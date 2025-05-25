import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import { getDistanceInMeters } from "../lib/getDistanceInMeters";
import { formatDistance } from "../lib/formatDistance";
import RatingStar from "@/shared/assets/search/star.svg?react";
import { NearbyPlacesResponse } from "../types/search.types";
import CategoryTag from "@/entities/search/ui/CategoryTag";
import { useLocation } from "react-router-dom";
import { LatLng } from "@/shared/types/common";
import FavoriteIcon from "@/shared/assets/search/favorite.svg?react";
import { useState } from "react";

function SearchPreviewCard({
  currLocation,
  ...place
}: { currLocation: LatLng | null } & NearbyPlacesResponse) {
  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search");

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleClickLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Link 이동 방지
    setIsLiked((prev) => !prev);
  };

  if (!currLocation) return;
  const distance = getDistanceInMeters(currLocation, {
    latitude: place.lat,
    longitude: place.lng,
  }); // 거리 계산
  const distanceLabel = formatDistance(distance); // 거리 포맷팅 (760m, 1.2km 등)

  return (
    <Container $isSearchPage={isSearchPage}>
      {isSearchPage && (
        <LikeActionButton $isLiked={isLiked} onClick={handleClickLike}>
          <FavoriteIcon width={20} height={20} strokeWidth={1} />
        </LikeActionButton>
      )}

      <OperatingHours />
      <Title>{place.name}</Title>
      <OperatingHours>
        {/* <Open>{place.currentOpeningHours?.openNow ? "Open " : "- "}</Open>
        <Closed>{closedDay ? `/ Closed every ${closedDay}` : "-"}</Closed> */}
        <Address>{place.address}</Address>
      </OperatingHours>
      <PlaceMetrics>
        <RatingWrapper>
          <RatingStar />
          <Rating>0</Rating>•
        </RatingWrapper>
        <Distance> {distanceLabel}</Distance>
      </PlaceMetrics>
      {isSearchPage && <CategoryTag>Hospital</CategoryTag>}
    </Container>
  );
}

export { SearchPreviewCard };

const Container = styled.li<{ $isSearchPage: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ $isSearchPage }) => ($isSearchPage ? "328px" : "236px")};
  height: fit-content;
  padding: 30px 20px;
  padding: ${({ $isSearchPage }) => ($isSearchPage ? "30px 20px" : "25px")};
  border-radius: 16px;
  background-color: ${theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;

const LikeActionButton = styled.button<{ $isLiked: boolean }>`
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: ${({ $isLiked }) => ($isLiked ? "#FF3332" : "none")};
  stroke: ${({ $isLiked }) => ($isLiked ? "#FF3332" : theme.colors.gray_7)};
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const Title = styled.strong`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.colors.black};
`;

const OperatingHours = styled.span`
  margin-bottom: 16px;
`;

const OperatingHoursText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.gray_7};
`;
const Address = styled(OperatingHoursText)`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// const Open = styled(OperatingHoursText)``;
// const Closed = styled(OperatingHoursText)``;

const PlaceMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 13px;
`;

const RatingWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Rating = styled.span`
  color: #fdcf18;
`;

const Distance = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.black};
`;
