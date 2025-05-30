import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { HospitalRecord } from "@/features/records/service/medicalDataApi";
import DateSelection from "./DateSelection";
import Modal from "@/shared/components/modal/Modal";
import { useTranslation } from "react-i18next";

interface MedicalEditDataProps {
  initialData: HospitalRecord;
  onSave: (updatedData: HospitalRecord) => void;
}

const MedicalEditData: React.FC<MedicalEditDataProps> = ({ initialData, onSave }) => {
  const {t} = useTranslation();
  const [formData, setFormData] = useState<HospitalRecord>(initialData);
  const [isDateSelectionOpen, setDateSelectionOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
   const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
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
      setShowModal(false);
  };

  const handleCancelSave = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <DataBlock>
        <Label>{t("Date of Visit")}</Label>
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
        <Label>{t("Visiting Hospital")}</Label>
        <ListBox isSelected={selectedIndex === 1}>
          <Input
            value={formData.visitingHospital}
            onFocus={() => setSelectedIndex(1)}
            onChange={(e) => handleChange(e, "visitingHospital", 1)}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>{t("Medical Subject")}</Label>
        <ListBox isSelected={selectedIndex === 2}>
          <Input
            value={formData.medicalSubject}
            onFocus={() => setSelectedIndex(2)}
            onChange={(e) => handleChange(e, "medicalSubject", 2)}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>{t("Symptoms")}</Label>
        <ListBox isSelected={selectedIndex === 3}>
          <Input
            value={formData.symptoms}
            onFocus={() => setSelectedIndex(3)}
            onChange={(e) => handleChange(e, "symptoms", 3)}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>{t("Treatment Summary")}</Label>
        <ListBox isSelected={selectedIndex === 4}>
          <Input
            value={formData.treatmentSummary}
            onFocus={() => setSelectedIndex(4)}
            onChange={(e) => handleChange(e, "treatmentSummary", 4)}
          />
        </ListBox>
      </DataBlock>

      <SaveButton onClick={handleSave}>{t("Save")}</SaveButton>

       <Modal isOpen={showModal} toggle={handleCancelSave}>
        <ModalBox>
          <MessageText>
            {t("Do you want to save your changes before exiting?").split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
              {line}
              {i !== arr.length - 1 && <br />}
              </React.Fragment>
        ))}
          </MessageText>
          <ButtonWrapper>
            <CancelButton onClick={handleCancelSave}>{t("Cancel")}</CancelButton>
            <ConfirmButton onClick={handleConfirmSave}>{t("Save")}</ConfirmButton>
          </ButtonWrapper>
        </ModalBox>
      </Modal>
    </Container>
  );
};


const Container = styled.div`
  background-color: #f5f9fc;
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
  margin-top: 80px;
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

const ModalBox = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  text-align: center;
  width: 316px;
  font-family: Pretendard;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.10);
  padding: 66px 0 0 0;
`;

const MessageText = styled.p`
  font-size: 18px;
  color: #000;
  font-weight: 400;
  text-align: center;
  line-height: normal;
  margin-bottom: 46px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #F1F1F5;
  border: none;
  border-radius: 0 0 0 10px;
  font-weight: 500;
  padding: 16px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: #0097a7;
  color: white;
  border: none;
  border-radius: 0 0 10px 0;
  font-weight: 500;
  padding: 16px;
  cursor: pointer;
`;
export default MedicalEditData;
