import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getHealthStatus, HealthStatus } from "@/features/records/service/healthDataApi"; 
import BloodPressurePart from "./BloodPressurePart";
import BloodSugarPart from "./BloodSugarPart";
import MedicineHistoryPart from "./MedicineHistoryPart";

interface Props {
  initialData?: HealthStatus;
  onSave: (updatedData: HealthStatus) => void;
}

const HealthEditData: React.FC<Props> = ({ initialData, onSave }) => {
  const [disease, setDisease] = useState("");
  const [allergy, setAllergy] = useState("");
  const [medicineHistory, setMedicineHistory] = useState("");
  const [bloodPressure, setBloodPressure] = useState({ contraction: "", relaxation: "" });
  const [bloodSugar, setBloodSugar] = useState({ fasting: "", postprandial: "" });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const [bpModalOpen, setBpModalOpen] = useState(false);
  const [bsModalOpen, setBsModalOpen] = useState(false);
  const [medicineModalOpen, setMedicineModalOpen] = useState(false);

useEffect(() => {
  setLoading(true);
  getHealthStatus()
    .then((response) => {
      const data = response.data; // 핵심 데이터만 추출
      if (data.bloodPressure !== undefined && data.bloodPressure !== null) {
        if (typeof data.bloodPressure === "number" && !isNaN(data.bloodPressure)) {
          const contraction = Math.floor(data.bloodPressure / 1000);
          const relaxation = data.bloodPressure % 1000;
          setBloodPressure({ contraction: String(contraction), relaxation: String(relaxation) });
        } else {
        }
      } else {
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
    .catch((error) => {
      setError("데이터를 불러오는 데 실패했습니다.");
    })
    .finally(() => {
      setLoading(false);
    });
}, []);




  const handleSave = () => {
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
  };

  if (loading) return <p>데이터를 불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <DataBlock>
        <Label>Disease</Label>
        <ListBox>
          <Input value={disease} onChange={(e) => setDisease(e.target.value)} />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>Allergy</Label>
        <ListBox>
          <Input value={allergy} onChange={(e) => setAllergy(e.target.value)} />
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>Blood Pressure</Label>
        <ListBox onClick={() => setBpModalOpen(true)}>
          <Text>
            {bloodPressure.contraction} / {bloodPressure.relaxation}
            <Unit> mmHg</Unit>
          </Text>
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>Blood Sugar</Label>
        <ListBox onClick={() => setBsModalOpen(true)}>
          <Text>
            {bloodSugar.fasting} / {bloodSugar.postprandial}
            <Unit> mg/dL</Unit>
          </Text>
        </ListBox>
      </DataBlock>

      <DataBlock>
        <Label>Medicine History</Label>
        <ListBox onClick={() => setMedicineModalOpen(true)}>
          <Text>{medicineHistory}</Text>
        </ListBox>
      </DataBlock>

      <SaveButton onClick={handleSave}>Save</SaveButton>

      {bpModalOpen && (
        <BloodPressurePart
          onClose={() => setBpModalOpen(false)}
          onSave={(data) => {
            setBloodPressure(data);
            setBpModalOpen(false);
          }}
        />
      )}
      {bsModalOpen && (
        <BloodSugarPart
          onClose={() => setBsModalOpen(false)}
          onSave={(data) => {
            setBloodSugar(data);
            setBsModalOpen(false);
          }}
        />
      )}
      {medicineModalOpen && (
        <MedicineHistoryPart
          onClose={() => setMedicineModalOpen(false)}
          onSave={(data) => {
            setMedicineHistory(data);
            setMedicineModalOpen(false);
          }}
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
  margin-top: 10px;
  margin-bottom: -10px;
  cursor: pointer;
`;

const Input = styled.input`
  color: #000;
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
  color: #000;
`;

const Unit = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-left: 4px;
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

export default HealthEditData;
