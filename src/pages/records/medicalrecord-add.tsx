import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import MedicalAddData from "@/features/records/ui/MedicalAddData";
import { initialMedicalFormData } from "@/features/records/consts/medicalConstants";
import { addHospital } from "@/features/records/service/medicalDataApi";
import CheckBox from "@/features/records/ui/CheckBox"; // 삭제 모달 재사용
import { formatDate } from "@/features/records/lib/DateForm";

type HospitalRecord = {
  visitDate: string;
  visitingHospital: string;
  medicalSubject: string;
  symptoms: string;
  treatmentSummary: string;
};

export default function MedicalRecordAdd() {
  const navigate = useNavigate();
  const [medicalData, setMedicalData] = useState(initialMedicalFormData);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmSave = () => {
    setIsConfirmOpen(true);
  };

  const handleRealSave = async () => {
    try {
      const record: HospitalRecord = {
        visitDate:
          formatDate(
            medicalData.find((item) => item.title === "Date of Visit")?.value ||
              ""
          ),
        visitingHospital:
          medicalData.find((item) => item.title === "Visiting Hospital")
            ?.value || "",
        medicalSubject:
          medicalData.find((item) => item.title === "Medical Subjects")
            ?.value || "",
        symptoms:
          medicalData.find((item) => item.title === "Symptoms")?.value || "",
        treatmentSummary:
          medicalData.find((item) => item.title === "Treatment Summary")
            ?.value || "",
      };

      const response = await addHospital(record);

      if (response) {
        setIsConfirmOpen(false);
        navigate("/records/medicalrecord-list");
      }
    } catch (err) {
      alert("저장 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/records/medicalrecord-list")}>
          <ArrowIcon
            width="25px"
            height="25px"
            stroke="black"
            style={{ marginLeft: -20 }}
          />
        </BackButton>
        <HeaderTitle>Medical Record</HeaderTitle>
      </Header>

      <MedicalAddData onDataChange={setMedicalData} />

      <SaveButton onClick={handleConfirmSave}>Save</SaveButton>

      {isConfirmOpen && (
        <CheckBox
          message={
            <>
              Do you want to save your <br />
              changes before exiting?
            </>
          }
          confirmText="Save"
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleRealSave}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  padding-bottom: 40px;
  position: relative;
  margin-top: 28px;
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

const SaveButton = styled.button`
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
