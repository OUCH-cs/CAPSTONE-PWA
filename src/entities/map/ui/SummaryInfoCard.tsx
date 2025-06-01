import { formatDistance } from "@/features/search/lib/formatDistance";
import { getDistanceInMeters } from "@/features/search/lib/getDistanceInMeters";
import { fallbackLocaton } from "@/shared/consts/common";
import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import LocationIcon from "@/shared/assets/map/location.svg?react";
import TelIcon from "@/shared/assets/map/phone.svg?react";

interface SummaryInfoCardProps {
  data: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    type: string;
    tel: string;
  };
}

export default function SummaryInfoCard(data: SummaryInfoCardProps) {
  console.log(data);

  const distance = getDistanceInMeters(fallbackLocaton, {
    latitude: data.data.lat,
    longitude: data.data.lng,
  }); // 거리 계산
  const distanceLabel = formatDistance(distance); // 거리 포맷팅 (760m, 1.2km 등)

  return (
    <Container>
      <TitleWrapper>
        <Title>{data.data.name}</Title>
        <PlaceMetrics>
          <Distance>{distanceLabel}</Distance>
          <Divide />
          <Type>{data.data.type}</Type>
        </PlaceMetrics>
      </TitleWrapper>

      <InfoWrapper>
        <AddressWrapper>
          <LocationIcon />
          <Address>{data.data.address}</Address>
        </AddressWrapper>
        <TelWrapper>
          <TelIcon />
          <Tel>{data.data.tel}</Tel>
        </TelWrapper>
      </InfoWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 52px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 180px;
  padding-left: 24px;
  border-radius: 24px 24px 0 0;
  background-color: ${theme.colors.white};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const Title = styled.strong`
  width: 300px;
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.primary};
`;

const PlaceMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 95px;
`;

const CommonTextStyle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.black};
`;

const Distance = styled(CommonTextStyle)``;
const Type = styled(CommonTextStyle)``;
const Tel = styled(CommonTextStyle)``;

const Divide = styled.div`
  width: 1px;
  height: 10px;
  background-color: #c3ccd3;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Address = styled(CommonTextStyle)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
