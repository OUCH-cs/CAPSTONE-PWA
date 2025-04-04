import React, { useState } from "react";
import DateSelection from "./dateSelection";

const initialData = [
  { title: "Date of Visit", value: "", editable: true },
  { title: "Visiting Hospital", value: "", editable: true },
  { title: "Medical Subjects", value: "", editable: true },
  { title: "Symptoms", value: "", editable: true },
  { title: "Treatment Summary", value: "", editable: true },
];

export default function MedicalAddData() {
  const [medicalData, setMedicalData] = useState(initialData);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDateSelect = (selectedDate: string) => {
    setMedicalData((prevData) =>
      prevData.map((item) =>
        item.title === "Date of Visit" ? { ...item, value: selectedDate } : item
      )
    );
    setDateModalOpen(false);
  };

  return (
    <div style={styles.container}>
      {medicalData.map((item, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div key={index}>
            <div
              style={{
                ...styles.date,
                color: isSelected ? "rgba(0, 151, 167, 1)" : "#000",
              }}
            >
              {item.title}
            </div>

            {item.title === "Date of Visit" ? (
              <div
                onClick={() => {
                  setSelectedIndex(index);
                  setDateModalOpen(true);
                }}
                style={{
                  ...styles.list,
                  borderBottom: isSelected
                    ? "1px solid rgba(0, 151, 167, 1)"
                    : "1px solid #F5F5F5",
                }}
              >
                <span
                style={{
                ...styles.dateText,
                color: item.value ? "rgba(0, 0, 0, 1)" : "#767676",
                }}
>
  {item.value}
</span>
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
                    setMedicalData((prev) =>
                      prev.map((data, i) =>
                        i === index ? { ...data, value: e.target.value } : data
                      )
                    )
                  }
                  onFocus={(e) => (e.target.style.color = "rgba(0, 0, 0, 1)")} // 입력 중에도 검은색 유지
                  onBlur={(e) => (e.target.style.color = "rgba(0, 0, 0, 1)")} // 포커스 해제 시에도 검은색 유지
                  style={styles.input}
                />
              </div>
            )}
          </div>
        );
      })}

      <DateSelection
        isOpen={dateModalOpen}
        onClose={() => setDateModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#F5F9FC",
    minHeight: "100vh",
    position: "relative",
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
    color: "rgba(0, 0, 0, 1)", // 검은색 고정
    fontFamily: "Pretendard",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
  },
};
