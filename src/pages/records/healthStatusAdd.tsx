import React from "react";
import ArrowIcon  from "@/shared/assets/common/backarrow.svg?react";
import { useNavigate } from "react-router-dom";
import HealthStatusAddData from "@/features/records/healthStatusAddData";
import StatusBar from "@/shared/assets/common/StatusBar";

export default function HealthStatusAdd() {
    const navigate = useNavigate();
  
    return (
      <div style={styles.container}>
        <StatusBar />
  
        {/* 헤더 */}
        <div style={styles.header}>
          <button onClick={() => navigate("/records/healthStatusRecordList")} style={styles.backButton}>
            <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
          </button>
          <h2 style={styles.headerTitle}>health Status</h2>
        </div>
         <HealthStatusAddData />

      <button style={styles.saveButton}>
      Save
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
    saveButton: {
        position:"absolute",
        marginTop: "-260px",
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

  export { HealthStatusAdd };