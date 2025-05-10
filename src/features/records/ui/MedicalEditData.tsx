import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { HospitalRecord } from "@/features/records/service/medicalDataApi";
import DateSelection from "./DateSelection";  // 수정된 DateSelection 임포트

interface MedicalEditDataProps {
  initialData: HospitalRecord;
  onSave: (updatedData: HospitalRecord) => void;
}

const MedicalEditData: React.FC<MedicalEditDataProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<HospitalRecord>(initialData);
  const [isDateSelectionOpen, setDateSelectionOpen] = useState(false);  // 날짜 선택 모달 상태

  useEffect(() => {
    setFormData(initialData); // prop 변경 시 반영
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof HospitalRecord) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  // 날짜 선택 모달 열기
  const handleDateChange = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      visitDate: date,  // visitDate 값 변경
    }));
    setDateSelectionOpen(false);  // 모달 닫기
  };

  return (
    <Container>
      <DataBlock>
        <Label>Date of Visit</Label>
        <ListBox>
          <Input 
            type="text" 
            value={formData.visitDate} 
            readOnly 
            onClick={() => setDateSelectionOpen(true)}  // 날짜 선택 모달 열기
          />
          {isDateSelectionOpen && (
            <DateSelection
              isOpen={isDateSelectionOpen}
              onClose={() => setDateSelectionOpen(false)}
              onDateSelect={handleDateChange}  // 날짜 선택 후 처리
            />
          )}
        </ListBox>
      </DataBlock>
      <DataBlock>
        <Label>Visiting Hospital</Label>
        <ListBox><Input value={formData.visitingHospital} onChange={(e) => handleChange(e, "visitingHospital")} /></ListBox>
      </DataBlock>
      <DataBlock>
        <Label>Medical Subject</Label>
        <ListBox><Input value={formData.medicalSubject} onChange={(e) => handleChange(e, "medicalSubject")} /></ListBox>
      </DataBlock>
      <DataBlock>
        <Label>Symptoms</Label>
        <ListBox><Input value={formData.symptoms} onChange={(e) => handleChange(e, "symptoms")} /></ListBox>
      </DataBlock>
      <DataBlock>
        <Label>Treatment Summary</Label>
        <ListBox><Input value={formData.treatmentSummary} onChange={(e) => handleChange(e, "treatmentSummary")} /></ListBox>
      </DataBlock>

      <SaveButton onClick={handleSave}>Save</SaveButton>
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
  color: #767676;
  font-size: 14px;
  font-weight: 400;
  font-family: Pretendard;
`;
const ListBox = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-top:10px;
  margin-bottom: -10px;
`;


const Input = styled.input`
  color: #000;
  margin-left: -5px;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
`;

const SaveButton = styled.button`
  position: absolute;
  margin-top: 100px;
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

export default MedicalEditData;
