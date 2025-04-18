import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import { useNavigate } from "react-router-dom";
import HealthStatusAddData from "@/features/records/ui/HealthStatusAddData";
import styled from "@emotion/styled";

export default function HealthStatusAdd() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <BackButton onClick={() => navigate("/records/healthstatus-record-list")}>
          <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
        </BackButton>
        <HeaderTitle>Health Status</HeaderTitle>
      </Header>

      <HealthStatusAddData />
    </Container>
  );
}



const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  padding-bottom: 40px;
  position: relative;
  margin: 14px 16px 0 16px;
`;

const Header = styled.div`
  margin-top: -13px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 7px;
  background: none;
  border: none;
  cursor: pointer;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: Pretendard;
`;
