import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getHealthStatus, HealthStatus } from "@/features/records/service/healthDataApi";
import BloodPressurePart from "./BloodPressurePart";
import BloodSugarPart from "./BloodSugarPart";
import Modal from "@/shared/components/modal/Modal";
import { useTranslation } from "react-i18next";

interface Props {
  initialData?: HealthStatus;
  onSave: (updatedData: HealthStatus) => void;
}

const HealthEditData: React.FC<Props> = ({ onSave }) => {
  const { t } = useTranslation();
  const [disease, setDisease] = useState("");
  const [allergy, setAllergy] = useState("");
  const [medicineHistory, setMedicineHistory] = useState("");
  const [bloodPressure, setBloodPressure] = useState({ contraction: "", relaxation: "" });
  const [bloodSugar, setBloodSugar] = useState({ fasting: "", postprandial: "" });
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [bpModalOpen, setBpModalOpen] = useState(false);
  const [bsModalOpen, setBsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setLoading(true);
    getHealthStatus()
      .then((response) => {
        const data = response.data;
        if (data.bloodPressure !== undefined && data.bloodPressure !== null) {
          if (typeof data.bloodPressure === "number" && !isNaN(data.bloodPressure)) {
            const contraction = Math.floor(data.bloodPressure / 1000);
            const relaxation = data.bloodPressure % 1000;
            setBloodPressure({ contraction: String(contraction), relaxation: String(relaxation) });
          }
        }

        if (data.bloodSugar !== undefined && data.bloodSugar !== null) {
          if (typeof data.bloodSugar === "number" && !isNaN(data.bloodSugar)) {
            const fasting = Math.floor(data.bloodSugar / 1000);
            const postprandial = data.bloodSugar % 1000;
            setBloodSugar({ fasting: String(fasting), postprandial: String(postprandial) });
          }
        }

        setDisease(data.disease || "");
        setAllergy(data.allergy || "");
        setMedicineHistory(data.medicineHistory || "");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    if (!isModified) return;
    setConfirmModalOpen(true);
  };

  const handleConfirmSave = () => {
    const bloodPressureNumber = Number(`${bloodPressure.contraction}${bloodPressure.relaxation}`);
    const bloodSugarNumber = Number(`${bloodSugar.fasting}${bloodSugar.postprandial}`);

    const updatedData: HealthStatus = {
      disease,
      allergy,
      bloodPressure: bloodPressureNumber,
      bloodSugar: bloodSugarNumber,
      medicineHistory,
    };

    onSave(updatedData);
    setConfirmModalOpen(false);
    setIsModified(false);
  };

  const handleCancelSave = () => {
    setConfirmModalOpen(false);
  };

  if (loading) return <p>데이터를 불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <DataBlock>
        <Label>{t("Disease")}</Label>
        <ListBox isSelected={selectedField === "disease"} onClick={() => setSelectedField("disease")}>
          <Input
            value={disease}
            onChange={(e) => {
              setDisease(e.target.value);
              setIsModified(true);
            }}
            placeholder={t("e.g. diabetes, colic")}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>{t("Allergy")}</Label>
        <ListBox isSelected={selectedField === "allergy"} onClick={() => setSelectedField("allergy")}>
          <Input
            value={allergy}
            onChange={(e) => {
              setAllergy(e.target.value);
              setIsModified(true);
            }}
            placeholder={t("e.g. pollen, sellfish, peach")}
          />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>{t("Blood Pressure")}</Label>
        <ListBox
          isSelected={selectedField === "bloodPressure"}
          onClick={() => {
            setSelectedField("bloodPressure");
            setBpModalOpen(true);
          }}
        >
          <Text>
            {bloodPressure.contraction && bloodPressure.relaxation
              ? `${bloodPressure.contraction} / ${bloodPressure.relaxation}`
              : "138 / 75"}
            <Unit> mmHg</Unit>
          </Text>
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>{t("Blood Sugar")}</Label>
        <ListBox
          isSelected={selectedField === "bloodSugar"}
          onClick={() => {
            setSelectedField("bloodSugar");
            setBsModalOpen(true);
          }}
        >
          <Text>
            {bloodSugar.fasting && bloodSugar.postprandial
              ? `${bloodSugar.fasting} / ${bloodSugar.postprandial}`
              : "90 / 164"}
            <Unit> mg/dL</Unit>
          </Text>
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>{t("History")}</Label>
        <ListBox
          isSelected={selectedField === "medicineHistory"}
          onClick={() => setSelectedField("medicineHistory")}
        >
          <Input
            value={medicineHistory}
            onChange={(e) => {
              setMedicineHistory(e.target.value);
              setIsModified(true);
            }}
            placeholder={t("e.g. Aspirin")}
          />
        </ListBox>
      </DataBlock>

      <SaveButton onClick={handleSave} isModified={isModified}>
        {t("Save")}
      </SaveButton>

      {bpModalOpen && (
        <BloodPressurePart
          onClose={() => setBpModalOpen(false)}
          onSave={(data) => {
            setBloodPressure(data);
            setBpModalOpen(false);
            setIsModified(true);
          }}
        />
      )}
      {bsModalOpen && (
        <BloodSugarPart
          onClose={() => setBsModalOpen(false)}
          onSave={(data) => {
            setBloodSugar(data);
            setBsModalOpen(false);
            setIsModified(true);
          }}
        />
      )}

      <Modal isOpen={isConfirmModalOpen} toggle={handleCancelSave}>
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

const ListBox = styled.div<{ isSelected?: boolean }>`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: ${(props) => (props.isSelected ? "1px solid #0097A7" : "1px solid #f5f5f5")};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-top: 10px;
  margin-bottom: -10px;
  cursor: pointer;
`;

const Input = styled.input`
  color: #434343;
  margin-left: -5px;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  background-color: transparent;
  border: none;
  width: 100%;
  outline: none;
  cursor: text;
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  color: #434343;
`;

const Unit = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 4px;
  color: #434343;
`;

const SaveButton = styled.button<{ isModified: boolean }>`
  position: absolute;
  margin-top: 80px;
  padding: 13px;
  font-size: 18px;
  font-weight: 400;
  background-color: ${(props) => (props.isModified ? "#0097a7" : "#cccccc")};
  color: ${(props) => (props.isModified ? "#FFFFFF" : "#767676")};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
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
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: #0097a7;
  color: white;
  border: none;
  border-radius: 0 0 10px 0;
  font-weight: 500;
  padding: 16px;
`;

export default HealthEditData;
