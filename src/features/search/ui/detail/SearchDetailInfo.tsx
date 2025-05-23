import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import { PlaceDetail } from "../../types/search.types";

export default function SearchDetailInfo(data: PlaceDetail) {
  return (
    <Container>
      <MediaclCourseWrapper>
        <Title>Medical Course</Title>
        <TextContent></TextContent>
      </MediaclCourseWrapper>

      <Line />

      <AddressWrapper>
        <Title>Address</Title>
        <TextContent>{data.formattedAddress}</TextContent>
      </AddressWrapper>

      <Line />

      <TelWrapper>
        <Tel>tel : {data.nationalPhoneNumber}</Tel>
      </TelWrapper>
    </Container>
  );
}

const Container = styled.section`
  width: 328px;
  height: 223px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${theme.colors.white};
`;

const Title = styled.strong`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const TextContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${theme.colors.gray_4};
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px 21px;
`;

const MediaclCourseWrapper = styled(InnerWrapper)``;
const AddressWrapper = styled(InnerWrapper)``;
const TelWrapper = styled(InnerWrapper)`
  padding-top: 25px;
`;

const Tel = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.black};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.white_f5};
`;
