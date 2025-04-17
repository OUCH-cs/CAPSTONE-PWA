import styled from "@emotion/styled";
import {healthStatusDetails} from "../consts/healthConstants"


export default function HealthStatusDetails() {
  return (
    <Container>
      {healthStatusDetails.map((item, index) => (
        <RecordItem
          key={index}
          isLast={index === healthStatusDetails.length - 1}
        >
          <Label>{item.title}</Label>
          <Value>{item.value}</Value>
        </RecordItem>
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
`;

const RecordItem = styled.div<{ isLast: boolean }>`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: ${(props) => (props.isLast ? "1px solid #e5e7eb" : "none")};
  border-bottom-left-radius: ${(props) => (props.isLast ? "10px" : "0")};
  border-bottom-right-radius: ${(props) => (props.isLast ? "10px" : "0")};
  padding-bottom: ${(props) => (props.isLast ? "18px" : "0")};
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin-left: 16px;
  margin-top: 18px;
`;

const Value = styled.p`
  font-size: 14px;
  color: #656565;
  font-weight: 400;
  margin-right: 16px;
  margin-top: 18px;
`;
