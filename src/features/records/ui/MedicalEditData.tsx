import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { HospitalRecord } from "@/features/records/service/medicalDataApi";
import DateSelection from "./DateSelection";
import CheckBox from "./CheckBox"; 

interface MedicalEditDataProps {
  initialData: HospitalRecord;
  onSave: (updatedData: HospitalRecord) => void;
}

const MedicalEditData: React.FC<MedicalEditDataProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<HospitalRecord>(initialData);
  const [isDateSelectionOpen, setDateSelectionOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // ✅ 모달 상태

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof HospitalRecord,
    index: number
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
    setSelectedIndex(index);
  };

  const handleSave = () => {
    setConfirmModalOpen(true); // ✅ 모달 열기
  };

  const handleDateChange = (date: string) => {
    const formattedDate = date.replace(/\./g, "-");
    setFormData((prevData) => ({
      ...prevData,
      visitDate: formattedDate,
    }));
    setDateSelectionOpen(false);
  };

  const handleConfirmSave = () => {
    onSave(formData); 
    setConfirmModalOpen(false); 
  };

  const handleCancelSave = () => {
    setConfirmModalOpen(false); 
  };

  return (
    <Container>
      <DataBlock>
        <Label>Date of Visit</Label>
        <ListBox
          isSelected={selectedIndex === 0}
          onClick={() => setDateSelectionOpen(true)}
        >
          <Input type="text" value={formData.visitDate} readOnly />
        </ListBox>
        {isDateSelectionOpen && (
          <DateSelection
            isOpen={isDateSelectionOpen}
            onClose={() => setDateSelectionOpen(false)}
            onDateSelect={handleDateChange}
          />
        )}
      </DataBlock>

      <DataBlock>
        <Label>Visiting Hospital</Label>
        <ListBox isSelected={selectedIndex === 1}>
          <Input
            value={formData.visitingHospital}
            onFocus={() => setSelectedIndex(1)}
            onChange={(e) => handleChange(e, "visitingHospital", 1)}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>Medical Subject</Label>
        <ListBox isSelected={selectedIndex === 2}>
          <Input
            value={formData.medicalSubject}
            onFocus={() => setSelectedIndex(2)}
            onChange={(e) => handleChange(e, "medicalSubject", 2)}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>Symptoms</Label>
        <ListBox isSelected={selectedIndex === 3}>
          <Input
            value={formData.symptoms}
            onFocus={() => setSelectedIndex(3)}
            onChange={(e) => handleChange(e, "symptoms", 3)}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>Treatment Summary</Label>
        <ListBox isSelected={selectedIndex === 4}>
          <Input
            value={formData.treatmentSummary}
            onFocus={() => setSelectedIndex(4)}
            onChange={(e) => handleChange(e, "treatmentSummary", 4)}
          />
        </ListBox>
      </DataBlock>

      <SaveButton onClick={handleSave}>Save</SaveButton>

      {isConfirmModalOpen && (
        <CheckBox
          onCancel={handleCancelSave}
          onConfirm={handleConfirmSave}
          confirmText="Save"
          message={
            <>
              Do you want to save your <br /> changes before exiting?
            </>
          }
        />
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

const ListBox = styled.div<{ isSelected: boolean }>`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid ${(props) => (props.isSelected ? "#0097A7" : "#E5E5EC")};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-top: 10px;
  margin-bottom: -10px;
  cursor: text;
`;

const Input = styled.input`
  color: #434343;
  margin-left: -5px;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
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
