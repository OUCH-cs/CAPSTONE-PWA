import { useNavigate } from 'react-router-dom'; // react-router-dom의 useNavigate 훅을 사용
import MedicalRecordDetails from '@/features/records/medicalRecordDetails';
import HealthStatusDetails from '@/features/records/healthStatusDetails';


function RecordsPage() {
  const navigate = useNavigate();

  return (
    
    <div style={styles.container}>
      {/* Medical Record Section */}
      <div
        style={styles.section}
        onClick={() => navigate('/records/medicalRecordList')} // 페이지 이동
      >
        <h2 style={styles.sectionTitle}>Medical Record</h2>
        
        <MedicalRecordDetails />
      </div>

      {/* Health Status SSection */}
      <div
        style={styles.section}
        onClick={() => navigate('/records/healthStatusRecordList')} // 페이지 이동
      >
        <h2 style={styles.sectionTitle}>Health Status</h2>
        <HealthStatusDetails />
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#F5F9FC',
    marginTop: 14,
    marginLeft:16,
    marginRight:16,
  },
  section: {
    marginTop:-13,
    backgroundColor: '#EEF6F9',
    borderRadius: 10,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)", 
    marginBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    cursor: 'pointer', // 클릭 가능하게 만듦
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: "13px 165px 14px 16px", 
    paddingTop:13,
  },
};

export { RecordsPage };
