/** MedicalRecord.tsx */
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import EditIcon from "@/shared/assets/common/edit-icon.svg?react";
import MedicalRecordData from "@/features/records/ui/MedicalRecordData";

export default function MedicalRecord() {
  const navigate = useNavigate();

  const handleEditIconPress = () => {
    // 수정 아이콘 클릭 시 로직 작성
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <BackButton onClick={() => navigate("/records/medicalrecord-list")}>
          <ArrowIcon width="25px" height="25px" stroke="black" />
        </BackButton>
        <HeaderTitle>Medical Record</HeaderTitle>
        <EditIconWrapper onClick={handleEditIconPress}>
          <EditIcon width={20} height={20} />
        </EditIconWrapper>
      </Header>

      {/* 의료 기록 리스트 */}
      <MedicalRecordData />
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  padding-bottom: 40px;
  padding-top: 10px;
  margin-left: 16px;
  margin-right: 16px;
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
