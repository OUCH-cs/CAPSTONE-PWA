import styled from "@emotion/styled";
import {healthStatusData} from "../consts/HealthConstants"


export default function HealthStatusData() {
  return (
    <Container>
      {healthStatusData.map((item, index) => (
        <div key={index}>
          <DateLabel>
            <DateText>{item.title}</DateText>
          </DateLabel>
          <List>
            <ListText>
              {item.value}
              {item.unit && <UnitText> {item.unit}</UnitText>}
            </ListText>
          </List>
        </div>
      ))}
    </Container>
  );
}

// styled components
const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  position: relative;
`;

const DateLabel = styled.div`
  margin-top: 32px;
  margin-bottom: 6px;
`;

const DateText = styled.p`
  color: #767676;
  font-size: 14px;
  font-weight: 400;
  font-family: Pretendard;
`;

const List = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-bottom: -10px;
`;

const ListText = styled.span`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  margin-left: -5px;
`;

const UnitText = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 1);
  margin-left: 4px;
`;
