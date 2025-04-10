import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import MedicalAddData from "@/features/records/ui/MedicalAddData";

export default function MedicalRecordAdd() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <BackButton onClick={() => navigate("/records/medicalrecord-list")}>
          <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
        </BackButton>
        <HeaderTitle>Medical Record</HeaderTitle>
      </Header>

      <MedicalAddData />

      <SaveButton>Save</SaveButton>
    </Container>
  );
}

// ==========================
// ✅ Emotion styled-components
// ==========================

const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  padding-bottom: 40px;
  position: relative;
  margin-top: 14px;
  margin-left: 16px;
  margin-right: 16px;
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

const SaveButton = styled.button`
  position: absolute;
  margin-top: -200px;
  padding: 13px;
  font-size: 18px;
  font-weight: 400;
  background-color: #0097a7;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
`;
