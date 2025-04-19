import  { useEffect } from 'react';
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import { useNavigate } from "react-router-dom";
import { diseases } from "@/features/records/consts/healthConstants";
import styled from "@emotion/styled";

export default function HealthStatusRecordList() {
  const navigate = useNavigate();
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
        <BackButton onClick={() => navigate("/records")}>
          <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
        </BackButton>
        <HeaderTitle>Health Record</HeaderTitle>
      </Header>

      {/* 질병 목록 렌더링 */}
      {diseases.map((disease, index) => (
        <div key={index}>
          <DateBox>
            <DateText>{disease.date}</DateText>
          </DateBox>

          <ListItem
            onClick={() => disease.name === diseases[0].name && navigate("/records/healthstatus")}
          >
            <ListText>{disease.name}</ListText>
            <ArrowIcon width="25px" height="25px" stroke="black" style={{ transform: "rotate(180deg)" }} />
          </ListItem>
        </div>
      ))}

      {/* + New 버튼 */}
      <FabButton onClick={() => navigate("/records/healthstatus-add")}>
        + New
      </FabButton>
    </Container>
  );
}


const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  padding-bottom: 40px;
  position: relative;
  margin: 28px 16px 0 16px;
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
  margin: 10px 0;
  font-family: Pretendard;
`;

const DateBox = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
`;

const DateText = styled.p`
  color: #767676;
  font-size: 14px;
  font-weight: 400;
  font-family: Pretendard;
`;

const ListItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  font-family: Pretendard;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
`;

const ListText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #000;
`;

const FabButton = styled.button`
  position: absolute;
  bottom: 95px;
  right: 20px;
  background-color: #0097a7;
  border-radius: 24px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  border: none;
  cursor: pointer;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;
