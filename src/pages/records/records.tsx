// RecordsPage.tsx
import { useNavigate } from 'react-router-dom';
import MedicalData from '@/features/records/ui/MedicalRecordDetails';
import HealthStatusDetails from '@/features/records/ui/HealthStatusDetails';
import styled from '@emotion/styled';

function RecordsPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Section onClick={() => navigate('/records/medicalrecord-list')}>
        <SectionTitle>Medical Record</SectionTitle>
        <MedicalData />
      </Section>

      <Section onClick={() => navigate('/records/healthstatus-record-list')}>
        <SectionTitle>Health Status</SectionTitle>
        <HealthStatusDetails />
      </Section>
    </Container>
  );
}

// 💡 Emotion 스타일 정의
const Container = styled.div`
  background-color: #f5f9fc;
  margin: 14px 16px 0 16px;
`;

const Section = styled.div`
  margin-top: -13px;
  background-color: #eef6f9;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 13px 165px 14px 16px;
  padding-top: 13px;
`;

export { RecordsPage };
