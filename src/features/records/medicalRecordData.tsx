import React from "react";

const medicalData = [
  { title: "Date of visit", value: "2024.11.24" },
  { title: "Visiting Hospital", value: "Hanyang Hospital" },
  { title: "Medical Subjects", value: "Internal Medicine" },
  { title: "Symptoms", value: "Fever, Cough" },
  { title: "Treatment Summary", value: "Prescribed antibiotics and rest" },
];

export default function MedicalRecordData() {
  return (
    <div style={styles.container}>
      {medicalData.map((item, index) => (
        <div key={index}>
          {/* 제목 */}
          <div style={styles.date}>
            <p style={styles.dateText}>{item.title}</p>
          </div>

          {/* 내용 */}
          <div style={styles.list}>
            <span style={styles.listText}>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#F5F9FC",
    minHeight: "100vh",
    position: "relative",
  },
  date: {
    marginTop: "32px",
    marginBottom: "6px",
  },
  dateText: {
    color: "#767676",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Pretendard",
  },
  list: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#FFF",
    borderBottom: "1px solid #F5F5F5",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    height:60,
    marginBottom:-10,
  },
  listText: {
    color: "#000",
    marginLeft:-5,
    fontSize: "16px",
    fontWeight: 400,
    fontFamily: "Pretendard",
  },
};
