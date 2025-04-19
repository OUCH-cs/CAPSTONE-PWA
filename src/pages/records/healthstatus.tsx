import  { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import EditIcon from "@/shared/assets/common/edit-icon.svg?react";
import HealthStatusData from "@/features/records/ui/HealthStatusData";

export default function HealthStatus() {
  const navigate = useNavigate();

  const handleEditIconPress = () => {
    // 추후 편집 기능 구현 예정
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';  // 페이지에서 스크롤 숨기기
    return () => {
      document.body.style.overflow = '';  
    };
  }, []);

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <BackButton onClick={() => navigate("/records/healthstatus-record-list")}>
          <ArrowIcon width="25px" height="25px" stroke="black" />
        </BackButton>
        <HeaderTitle>Health Status</HeaderTitle>
        <EditIconWrapper onClick={handleEditIconPress}>
          <EditIcon width={20} height={20} />
        </EditIconWrapper>
      </Header>

      {/* 의료 기록 리스트 */}
      <HealthStatusData />
    </Container>
  );
}


const Container = styled.div`
  background-color: #f5f9fc;
  padding-bottom: 40px;
  padding-top: 10px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 14px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: -13px;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const EditIconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: -8px;
`;
