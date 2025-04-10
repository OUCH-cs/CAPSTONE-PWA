import styled from "@emotion/styled";
import { useState } from "react";
import BloodPressurePart from "./BloodPressurePart";
import BloodSugarPart from "./BloodSugarPart";
import MedicineHistoryPart from "./MedicineHistoryPart";
import {initialHealthFormData} from "../consts/HealthConstants"


export default function HealthStatusAddData() {
  const [healthData, setHealthData] = useState(initialHealthFormData);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [bloodPressureModalOpen, setBloodPressureModalOpen] = useState(false);
  const [bloodPressure, setBloodPressure] = useState({ contraction: "", relaxation: "" });

  const [bloodSugarModalOpen, setBloodSugarModalOpen] = useState(false);
  const [bloodSugar, setBloodSugar] = useState({ fasting: "", postprandial: "" });

  const [medicineHistoryModalOpen, setMedicineHistoryModalOpen] = useState(false);
  const [medicineHistory, setMedicineHistory] = useState("");

  return (
    <Container>
      {healthData.map((item, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div key={index}>
            <Label isSelected={isSelected}>{item.title}</Label>

            {item.title === "Blood pressure" ? (
              <List isSelected={isSelected} onClick={() => setBloodPressureModalOpen(true)}>
                <DateText>
                  {bloodPressure.contraction} / {bloodPressure.relaxation}{" "}
                  <span style={{ fontSize: 12, fontWeight: 400 }}>mmHg</span>
                </DateText>
              </List>
            ) : item.title === "Blood sugar" ? (
              <List isSelected={isSelected} onClick={() => setBloodSugarModalOpen(true)}>
                <DateText>
                  {bloodSugar.fasting} / {bloodSugar.postprandial}{" "}
                  <span style={{ fontSize: 12, fontWeight: 400 }}>mg/dL</span>
                </DateText>
              </List>
            ) : item.title === "Medicine History" ? (
              <List isSelected={isSelected} onClick={() => setMedicineHistoryModalOpen(true)}>
                <DateText>{medicineHistory}</DateText>
              </List>
            ) : (
              <List isSelected={isSelected} onClick={() => setSelectedIndex(index)}>
                <StyledInput
                  type="text"
                  value={item.value}
                  onChange={(e) =>
                    setHealthData((prev) =>
                      prev.map((data, i) =>
                        i === index ? { ...data, value: e.target.value } : data
                      )
                    )
                  }
                />
              </List>
            )}
          </div>
        );
      })}

      <SaveButton>Save</SaveButton>

      {/* 모달들 */}
      {bloodPressureModalOpen && (
        <BloodPressurePart
          onClose={() => setBloodPressureModalOpen(false)}
          onSave={(data) => {
            setBloodPressure(data);
            setHealthData((prev) =>
              prev.map((item) =>
                item.title === "Blood pressure"
                  ? {
                      ...item,
                      value: `${data.contraction} / ${data.relaxation} mmHg`,
                    }
                  : item
              )
            );
            setBloodPressureModalOpen(false);
          }}
        />
      )}

      {bloodSugarModalOpen && (
        <BloodSugarPart
          onClose={() => setBloodSugarModalOpen(false)}
          onSave={(value) => {
            setBloodSugar(value);
            setHealthData((prev) =>
              prev.map((item) =>
                item.title === "Blood sugar"
                  ? {
                      ...item,
                      value: `${value.fasting} / ${value.postprandial} mg/dL`,
                    }
                  : item
              )
            );
            setBloodSugarModalOpen(false);
          }}
        />
      )}

      {medicineHistoryModalOpen && (
        <MedicineHistoryPart
          onClose={() => setMedicineHistoryModalOpen(false)}
          onSave={(data: string) => {
            setMedicineHistory(data);
            setHealthData((prev) =>
              prev.map((item) =>
                item.title === "Medicine History"
                  ? {
                      ...item,
                      value: data,
                    }
                  : item
              )
            );
            setMedicineHistoryModalOpen(false);
          }}
        />
      )}
    </Container>
  );
}

// 🔻 styled-components
const Container = styled.div`
  background-color: #5f9fc;
  min-height: 100vh;
  position: relative;
`;

const Label = styled.div<{ isSelected: boolean }>`
  margin-top: 26px;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 400;
  font-family: Pretendard;
  color: ${({ isSelected }) => (isSelected ? "rgba(0, 151, 167, 1)" : "rgba(67, 67, 67, 1)")};
`;

const List = styled.div<{ isSelected: boolean }>`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-bottom: 0;
  border-bottom: ${({ isSelected }) =>
    isSelected ? "1px solid rgba(0, 151, 167, 1)" : "1px solid #f5f5f5"};
`;

const DateText = styled.span`
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
`;

const StyledInput = styled.input`
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-family: Pretendard;
  outline: none;
  border: none;
  background-color: transparent;
  margin-top: -10px;
  width: 100%;
`;

const SaveButton = styled.button`
  position: absolute;
  margin-top: 73px;
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
