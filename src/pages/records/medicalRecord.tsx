import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import EditIcon from "@/shared/assets/common/edit-icon.svg?react";
import MedicalRecordData from "@/features/records/medicalRecordData";
import StatusBar from "@/shared/assets/common/StatusBar";

export default function MedicalRecord() {
  const navigate = useNavigate();

  const handleEditIconPress = () => {
    
  };

  return (
    <div style={styles.container}>
      <StatusBar />

      {/* 헤더 */}
      <div style={styles.header}>
        <button onClick={() => navigate("/records/medicalRecordList")} style={styles.backButton}>
          <ArrowIcon width="25px" height="25px" stroke="black" />
        </button>
        <h2 style={styles.headerTitle}>Medical Record</h2>
        <button onClick={handleEditIconPress} style={styles.editIconWrapper}>
          <EditIcon width={20} height={20} />
        </button>
      </div>

      {/* 의료 기록 리스트 */}
      <MedicalRecordData />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#F5F9FC",
    minHeight: "100vh",
    paddingBottom: "40px",
    marginTop: 14,
    marginLeft: 16,
    marginRight: 16,
  },
  header: {
    marginTop: 23,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 아이콘들을 양쪽 끝으로 정렬
    position: "relative",
  },
  backButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginLeft: -13, // 아이콘 위치 조정
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "#000",
    textAlign: "center",
    fontFamily: "Pretendard",
    position: "absolute", // 중앙 고정
    left: "50%",
    transform: "translateX(-50%)",
  },
  editIconWrapper: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginRight: -8, // 아이콘 위치 조정
  },
};

export { MedicalRecord };
