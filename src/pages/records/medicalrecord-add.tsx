import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import MedicalAddData from "@/features/records/ui/MedicalAddData";
import { initialMedicalFormData } from "@/features/records/consts/medicalConstants";
import { addHospital } from "@/features/records/service/medicalDataApi";
import Modal from "@/shared/components/modal/Modal";  
import { formatDate } from "@/features/records/lib/DateForm";
import { useTranslation } from "react-i18next";

type HospitalRecord = {
  visitDate: string;
  visitingHospital: string;
  medicalSubject: string;
  symptoms: string;
  treatmentSummary: string;
};

export default function MedicalRecordAdd() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [medicalData, setMedicalData] = useState(initialMedicalFormData);
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const isAnyFieldFilled = medicalData.some(
  (item) => item.value && item.value.trim() !== ""
);

const isAllFieldsFilled = medicalData.every(
  (item) => item.value && item.value.trim() !== ""
);


  const handleConfirmSave = () => {
  if (!isAllFieldsFilled) {
    setShowWarning(true); 
    return;
  }
  setShowWarning(false);
  setShowModal(true);
};

  const handleRealSave = async () => {
    try {
      const record: HospitalRecord = {
        visitDate: formatDate(
          medicalData.find((item) => item.title === "Date of Visit")?.value || ""
        ),
        visitingHospital:
          medicalData.find((item) => item.title === "Visiting Hospital")?.value || "",
        medicalSubject:
          medicalData.find((item) => item.title === "Medical Subjects")?.value || "",
        symptoms:
          medicalData.find((item) => item.title === "Symptoms")?.value || "",
        treatmentSummary:
          medicalData.find((item) => item.title === "Treatment Summary")?.value || "",
      };

      const response = await addHospital(record);

      if (response) {
        setShowModal(false);
        navigate("/records/medicalrecord-list");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/records/medicalrecord-list")}>
          <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
        </BackButton>
        <HeaderTitle>{t("Medical Record")}</HeaderTitle>
      </Header>

      <MedicalAddData onDataChange={setMedicalData} />

      <SaveButton onClick={handleConfirmSave} disabled={!isAnyFieldFilled}>
      {t("Save")}
      </SaveButton>

      
      {showWarning && (
        <WarningText>{t("Please fill in all fields before saving")}</WarningText>
      )}


      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalBox>
          <MessageText>
            {t("Do you want to save your changes before exiting?")
              .split("\n")
              .map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i !== arr.length - 1 && <br />}
                </React.Fragment>
              ))}
          </MessageText>
          <ButtonWrapper>
            <CancelButton onClick={() => setShowModal(false)}>
              {t("Cancel")}
            </CancelButton>
            <ConfirmButton onClick={handleRealSave}>
              {t("Save")}
            </ConfirmButton>
          </ButtonWrapper>
        </ModalBox>
      </Modal>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  background-color: #f5f9fc;
  position: relative;
  padding-top: 28px;
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

const SaveButton = styled.button<{ disabled: boolean }>`
  margin-top: 80px;
  padding: 13px;
  font-size: 18px;
  font-weight: 400;
  background-color: ${({ disabled }) => (disabled ? "#E5E5EC" : "#0097a7")};
  color: ${({ disabled }) => (disabled ? "#767676" : "#fff")};
  border: none;
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
  transition: background-color 0.2s, color 0.2s;
`;

const ModalBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  text-align: center;
  width: 316px;
  font-family: Pretendard;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);
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
  background-color: #f1f1f5;
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
const WarningText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  font-weight: 500;
`;
