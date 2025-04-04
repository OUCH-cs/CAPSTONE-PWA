import React from "react";

const healthStatusData = [
    { title: "Disease", value: "diabetes, colic1" },
    { title: "Allergy", value: "pollen, shellfish, peach" },
    { title: "Blood pressure", value: "138 / 75", unit: "mmHg" },
    { title: "Blood sugar", value: "90 / 164", unit: "mg/dL" },
    { title: "Medicine History", value: "dermatological" },
];

export default function HealthStatusData() {
  return (
    <div style={styles.container}>
      {healthStatusData.map((item, index) => (
        <div key={index}>
          {/* 제목 */}
          <div style={styles.date}>
            <p style={styles.dateText}>{item.title}</p>
          </div>

          {/* 내용 */}
          <div style={styles.list}>
            <span style={styles.listText}>
              {item.value}
              {item.unit && <span style={styles.unitText}> {item.unit}</span>}
            </span>
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
  unitText: {
    fontSize: "12px", 
    color: "rgba(0,0,0,1)",
    marginLeft: "4px",
  },
};
