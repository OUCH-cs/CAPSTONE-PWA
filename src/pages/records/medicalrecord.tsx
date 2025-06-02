import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import EditIcon from "@/shared/assets/common/edit-icon.svg?react";
import MedicalRecordData from "@/features/records/ui/MedicalRecordData";
import { useTranslation } from "react-i18next";


export default function MedicalRecord() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const {t} =  useTranslation()

  const handleEditIconPress = () => {
    navigate(`/records/medicalrecord-edit/${id}`);
  };


  // id가 없는 경우 예외 처리 
  if (!id) {
    return <p>잘못된 접근입니다. 목록으로 돌아가주세요.</p>;
  }

  return (
    <Container>
      
      <Header>
        <BackButton onClick={() => navigate("/records/medicalrecord-list")}>
          <ArrowIcon width="25px" height="25px" stroke="black" />
        </BackButton>
        <HeaderTitle>{t("Medical Record")}</HeaderTitle>
        <EditIconWrapper onClick={handleEditIconPress}>
          <EditIcon width={20} height={20} />
        </EditIconWrapper>
      </Header>

      <MedicalRecordData id={id} />
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  padding-bottom: 40px;
  padding-top: 24px;
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