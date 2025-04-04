import React from "react";
import ArrowIcon  from "@/shared/assets/common/backarrow.svg?react";
import { useNavigate } from "react-router-dom";
import { hospitals } from "@/features/records/hospitals";
// 병원 목록과 날짜 import
import StatusBar from "@/shared/assets/common/StatusBar";

export default function MedicalRecordList() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <StatusBar />

      {/* 헤더 */}
      <div style={styles.header}>
        <button onClick={() => navigate("/records")} style={styles.backButton}>
        <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
        </button>
        <h2 style={styles.headerTitle}>Medical Record</h2>
      </div>

      {/* 병원 목록 렌더링 */}
      {hospitals.map((hospital, index) => (
        <div key={index}>
          {/* 날짜 표시 */}
          <div style={styles.date}>
            <p style={styles.dateText}>{hospital.date}</p>
          </div>

          {/* 병원 목록 버튼 */}
          <button
            onClick={() => navigate(hospital.name === hospitals[0].name ? "/records/medicalRecord" : "#")}
            style={styles.listItem}
          >
            <span style={styles.listText}>{hospital.name}</span>
            <ArrowIcon width="25px" height="25px" stroke="black" style={{ transform: "rotate(180deg)" }} />

          </button>
        </div>
      ))}

      {/* + New 버튼 */}
      <button onClick={() => navigate("/records/medicalRecordAdd")} style={styles.fabButton}>
        + New
      </button>
    </div>
  );
}

/* ✅ styles 오타 및 수정 */
const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#F5F9FC",
    minHeight: "100vh",
    paddingBottom: "40px",
    position: "relative",
    marginTop: 14,
    marginLeft: 16,
    marginRight: 16,
  },
  backButton: {
    position: "absolute",
    left: 7,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  header: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: 500,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Pretendard",
  },
  date: {
    marginTop: 24,
    marginBottom: 8,
  },
  dateText: {
    color: "#767676",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Pretendard",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    fontFamily: "Pretendard",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.04)",
  },
  listText: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#000",
  },
  fabButton: {
    position: "fixed",
    bottom: 75,
    right: 20,
    backgroundColor: "#0097A7",
    borderRadius: "24px",
    padding: "12px 16px",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 400,
    fontFamily: "Pretendard",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.15)",
  },
  
};
export { MedicalRecordList };
