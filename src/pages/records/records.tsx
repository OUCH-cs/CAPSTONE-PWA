// RecordsPage.tsx
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MedicalData from '@/features/records/ui/MedicalRecordDetails';
import HealthStatusDetails from '@/features/records/ui/HealthStatusDetails';
import styled from '@emotion/styled';

function RecordsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';  // 페이지에서 스크롤 숨기기
    return () => {
      document.body.style.overflow = '';  
    };
  }, []);

  return (
    <Container>
      <Section onClick={() => navigate('/records/medicalrecord-list')}>
        <SectionTitle>Medical Record</SectionTitle>
        <MedicalData />
      </Section>

      <Section onClick={() => navigate('/records/healthstatus')}>
        <SectionTitle>Health Status</SectionTitle>
        <HealthStatusDetails />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  margin: 28px 16px 0 16px;
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
