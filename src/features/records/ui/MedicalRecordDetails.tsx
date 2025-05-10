import styled from "@emotion/styled";
import {medicalDetail} from "../consts/medicalConstants"

export default function MedicalRecordDetails() {
  return (
    <Container>
      {medicalDetail.map((item, index) => (
        <RecordItem
          key={index}
          isLast={index === medicalDetail.length - 1}
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
  padding-left: 16px;
  height: 78px;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
  border-bottom-left-radius: ${({ isLast }) => (isLast ? "10px" : "0")};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? "10px" : "0")};
  margin-bottom: ${({ isLast }) => (isLast ? "-14px" : "0")};
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  padding-top: 18px;
  padding-bottom: 4px;
`;

const Value = styled.p`
  font-size: 14px;
  color: #656565;
  font-weight: 400;
  margin-bottom: 9px;
`;