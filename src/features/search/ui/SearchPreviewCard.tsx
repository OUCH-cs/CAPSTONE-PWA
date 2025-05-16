import { LatLng } from "@/features/map/map.types";
import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import { getDistanceInMeters } from "../lib/getDistanceInMeters";
import { formatDistance } from "../lib/formatDistance";
import RatingStar from "@/shared/assets/search/star.svg?react";
import { Place } from "../search.types";
import CategoryTag from "@/entities/search/ui/CategoryTag";

function SearchPreviewCard({
  currLocation,
  ...place
}: { currLocation: LatLng | null } & Place) {
  // 아래 유틸 로직 외부로 분리

  // 휴무일 정보 가져오기
  const closedDay = place.currentOpeningHours?.weekdayDescriptions
    .find((day) => day.includes("Closed"))
    ?.split(":")[0];

  if (!currLocation) return;
  const distance = getDistanceInMeters(currLocation, place.location); // 거리 계산
  const distanceLabel = formatDistance(distance); // 거리 포맷팅 (760m, 1.2km 등)

  return (
    <Container>
      <Title>{place.displayName.text}</Title>
      <OperatingHours>
        <Open>{place.currentOpeningHours?.openNow ? "Open / " : ""}</Open>
        <Closed>{closedDay ? `Closed every ${closedDay}` : ""}</Closed>
      </OperatingHours>
      <PlaceMetrics>
        {place.rating && (
          <RatingWrapper>
            <RatingStar />
            <Rating>{place.rating}</Rating>•
          </RatingWrapper>
        )}
        <Distance> {distanceLabel}</Distance>
      </PlaceMetrics>
      {place.primaryTypeDisplayName && (
        <CategoryTag>{place.primaryTypeDisplayName.text}</CategoryTag>
      )}
    </Container>
  );
}

export { SearchPreviewCard };

const Container = styled.li`
  display: flex;
  flex-direction: column;
  width: 328px;
  height: fit-content;
  padding: 30px 20px;
  border-radius: 16px;
  background-color: ${theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;

const Title = styled.strong`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
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
const Open = styled(OperatingHoursText)``;
const Closed = styled(OperatingHoursText)``;

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
