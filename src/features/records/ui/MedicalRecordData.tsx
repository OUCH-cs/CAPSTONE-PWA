import React, { useEffect, useState } from "react";
import { getMedicalRecordById } from "@/features/records/service/medicalDataApi";  // ✅ API 호출

interface HospitalRecord {
  id: string;
  visitDate: string;
  visitingHospital: string;
  medicalSubject: string;
  symptoms: string;
  treatmentSummary: string;
}

// MedicalRecordData 컴포넌트가 id를 props로 받도록 수정
interface MedicalRecordDataProps {
  id: string;
}

const MedicalRecordData: React.FC<MedicalRecordDataProps> = ({ id }) => {
  const [hospitalRecord, setHospitalRecord] = useState<HospitalRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const response = await getMedicalRecordById(id);
        console.log("API 응답:", response); // 응답 데이터 구조를 확인합니다.
        // 응답 구조에 따라 데이터를 setHospitalRecord에 올바르게 전달합니다.
        setHospitalRecord(response.data);  // 또는 response.data에서 적절한 데이터를 사용
      } catch (error) {
        setError("의료기록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, [id]);  // id가 변경될 때마다 재요청

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      {hospitalRecord ? (
        <div>
          <div style={styles.date}>
            <p style={styles.dateText}>Date of visit</p>
            <div style = {styles.list}>
            <span style={styles.listText}>{hospitalRecord.visitDate}</span>
            </div>
          </div>

          <div style={styles.date}>
            <p style={styles.dateText}>Visiting Hospital</p>
            <div style = {styles.list}>
            <span style={styles.listText}>{hospitalRecord.visitingHospital}</span>
            </div>
          </div>

          <div style={styles.date}>
            <p style={styles.dateText}>Medical Subjects</p>
            <div style = {styles.list}>
            <span style={styles.listText}>{hospitalRecord.medicalSubject}</span>
            </div>
          </div>
          
          <div style={styles.date}>
            <p style={styles.dateText}>Symptoms</p>
            <div style = {styles.list}>
            <span style={styles.listText}>{hospitalRecord.symptoms}</span>
            </div>
          </div>

          <div style={styles.date}>
            <p style={styles.dateText}>Treatment Summary</p>
            <div style = {styles.list}>
            <span style={styles.listText}>{hospitalRecord.treatmentSummary}</span>
          </div>
          </div>
        </div>
      ) : (
        <p>의료 기록을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

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
export default MedicalRecordData;
