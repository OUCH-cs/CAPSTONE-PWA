import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getMedicalRecordById } from "@/features/records/service/medicalDataApi";

interface HospitalRecord {
  id: string;
  visitDate: string;
  visitingHospital: string;
  medicalSubject: string;
  symptoms: string;
  treatmentSummary: string;
}

interface MedicalRecordDataProps {
  id: string;
}

const MedicalRecordData: React.FC<MedicalRecordDataProps> = ({ id }) => {
  const [hospitalRecord, setHospitalRecord] = useState<HospitalRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const response = await getMedicalRecordById(id);
        setHospitalRecord(response.data);
      } catch (error) {
        setError("의료기록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {hospitalRecord ? (
        <>
          <DataBlock>
            <Label>Date of visit</Label>
            <ListBox><ListText>{hospitalRecord.visitDate}</ListText></ListBox>
          </DataBlock>

          <DataBlock>
            <Label>Visiting Hospital</Label>
            <ListBox><ListText>{hospitalRecord.visitingHospital}</ListText></ListBox>
          </DataBlock>

          <DataBlock>
            <Label>Medical Subjects</Label>
            <ListBox><ListText>{hospitalRecord.medicalSubject}</ListText></ListBox>
          </DataBlock>

          <DataBlock>
            <Label>Symptoms</Label>
            <ListBox><ListText>{hospitalRecord.symptoms}</ListText></ListBox>
          </DataBlock>

          <DataBlock>
            <Label>Treatment Summary</Label>
            <ListBox><ListText>{hospitalRecord.treatmentSummary}</ListText></ListBox>
          </DataBlock>
        </>
      ) : (
        <p>의료 기록을 찾을 수 없습니다.</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  position: relative;
`;

const DataBlock = styled.div`
  margin-top: 32px;
  margin-bottom: 6px;
`;

const Label = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 400;
  font-family: Pretendard;
`;

const ListBox = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #E5E5EC;
  border-radius:12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-top:10px;
  margin-bottom: -10px;
`;

const ListText = styled.span`
  color: #434343;
  margin-left: -5px;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
`;

export default MedicalRecordData;