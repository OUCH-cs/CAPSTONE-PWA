import styled from "@emotion/styled";
import MedicalMain from "@/shared/assets/records/medicalMain.svg?react";
import HealthMain from "@/shared/assets/records/healthMain.svg?react";
import DiagnosisMain from "@/shared/assets/records/diagnosisMain.svg?react";
import { useNavigate } from 'react-router-dom';


export default function MedicalRecordDetails() {
    const navigate = useNavigate();
  return (
    <>
      <Container onClick={() => navigate("/records/self-diagnosis-list")}>
        <DiagnosisMain width="60px" height="60px" />
        <SectionTitle>Self-Diagnosis</SectionTitle>
      </Container>
        <Container onClick={() => navigate("/records/medicalrecord-list")}>
        <MedicalMain width="60px" height="60px" />
        <SectionTitle>Medical Record</SectionTitle>
      </Container>
      <Container onClick={() => navigate("/records/healthstatus")}>
        <HealthMain width="60px" height="60px" />
        <SectionTitle>Health Status</SectionTitle>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex; 
  border-radius: 10px;
  flex-direction: column;
  background: #FFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  height:180px;
  align-items:center;
  justify-content:center;
  margin-top:16px;
  cursor: pointer;
`;
const SectionTitle = styled.p`
  text-align:center;
  font-size:20px;
  font-weight:600;
  margin-top:13px;
`;

