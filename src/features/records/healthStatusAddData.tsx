import React, { useState } from "react";
import BloodPressurePart from "./bloodPressurePart";
import BloodSugarPart from "./bloodSugarPart";
import MedicineHistoryPart from "./medicineHistoryPart";

const initialData = [
  { title: "Disease", value: "", editable: true },
  { title: "Allergy", value: "", editable: true },
  { title: "Blood pressure", value: "", editable: true },
  { title: "Blood sugar", value: "", editable: true },
  { title: "Medicine History", value: "", editable: true },
];

export default function HealthStatusAddData() {
  const [healthData, setHealthData] = useState(initialData);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [bloodPressureModalOpen, setBloodPressureModalOpen] = useState(false);
  const [bloodPressure, setBloodPressure] = useState({ contraction: "", relaxation: "" });

  const [bloodSugarModalOpen, setBloodSugarModalOpen] = useState(false);
  const [bloodSugar, setBloodSugar] = useState({ fasting: "", postprandial: "" });

  const [medicineHistoryModalOpen, setMedicineHistoryModalOpen] = useState(false);
  const [medicineHistory, setMedicineHistory] = useState("");

  return (
    <div style={styles.container}>
      {healthData.map((item, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div key={index}>
            <div
              style={{
                ...styles.date,
                color: isSelected ? "rgba(0, 151, 167, 1)" : "rgba(67, 67, 67, 1)",
              }}
            >
              {item.title}
            </div>

            {item.title === "Blood pressure" ? (
              <div
                onClick={() => setBloodPressureModalOpen(true)}
                style={{
                  ...styles.list,
                  borderBottom: isSelected
                    ? "1px solid rgba(0, 151, 167, 1)"
                    : "1px solid #F5F5F5",
                }}
              >
                <span style={styles.dateText}>
                  {bloodPressure.contraction} / {bloodPressure.relaxation}{" "}
                  <span style={{ fontSize: 12, fontWeight: 400 }}>mmhg</span>
                </span>
              </div>
            ) : item.title === "Blood sugar" ? (
              <div
                onClick={() => setBloodSugarModalOpen(true)}
                style={{
                  ...styles.list,
                  borderBottom: isSelected
                    ? "1px solid rgba(0, 151, 167, 1)"
                    : "1px solid #F5F5F5",
                }}
              >
                <span style={styles.dateText}>
                  {bloodSugar.fasting} / {bloodSugar.postprandial}{" "}
                  <span style={{ fontSize: 12, fontWeight: 400 }}>mg/dL</span>
                </span>
              </div>
            ) : item.title === "Medicine History" ? (
              <div
                onClick={() => setMedicineHistoryModalOpen(true)}
                style={{
                  ...styles.list,
                  borderBottom: isSelected
                    ? "1px solid rgba(0, 151, 167, 1)"
                    : "1px solid #F5F5F5",
                }}
              >
                <span style={styles.dateText}>{medicineHistory}</span>
              </div>
            ) : (
              <div
                style={{
                  ...styles.list,
                  borderBottom: isSelected
                    ? "1px solid rgba(0, 151, 167, 1)"
                    : "1px solid #F5F5F5",
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) =>
                    setHealthData((prev) =>
                      prev.map((data, i) =>
                        i === index ? { ...data, value: e.target.value } : data
                      )
                    )
                  }
                  onFocus={(e) => (e.target.style.color = "rgba(0, 0, 0, 1)")}
                  onBlur={(e) => (e.target.style.color = "rgba(0, 0, 0, 1)")}
                  style={styles.input}
                />
              </div>
            )}
          </div>
        );
      })}

      <button style={styles.saveButton}>Save</button>

      {/* 혈압 입력 모달 */}
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

      {/* 혈당 입력 모달 */}
      {bloodSugarModalOpen && (
        <BloodSugarPart
          onClose={() => setBloodSugarModalOpen(false)}
          onSave={(value: { fasting: string; postprandial: string }) => {
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

      {/* 약물 복용 이력 모달 */}
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
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#5F9FC",
    minHeight: "100vh",
    position: "relative" as const,
  },
  date: {
    marginTop: "26px",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Pretendard",
  },
  dateText: {
    fontSize: "16px",
    fontWeight: 400,
    fontFamily: "Pretendard",
  },
  list: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#FFF",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    height: 60,
    marginBottom: 0,
  },
  input: {
    fontSize: "16px",
    fontWeight: 400,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Pretendard",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
  },
  saveButton: {
    position: "absolute" as const,
    marginTop: "73px",
    padding: "13px",
    fontSize: "18px",
    fontWeight: 400,
    backgroundColor: "#0097A7",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
  },
};
