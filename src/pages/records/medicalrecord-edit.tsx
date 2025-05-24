import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import MedicalEditData from "@/features/records/ui/MedicalEditData";
import styled from "@emotion/styled";
import { getMedicalRecordById, editHospitals, HospitalRecord } from "@/features/records/service/medicalDataApi";

const MedicalRecordEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [hospitalRecord, setHospitalRecord] = useState<HospitalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // id로 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getMedicalRecordById(id);
          setHospitalRecord(response.data);
        }
      } catch (e) {
        setError("의료 기록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 저장 버튼 클릭 시
  const handleSave = async (updatedData: HospitalRecord) => {
    try {
      if (!updatedData.id) throw new Error("ID가 없습니다.");
      await editHospitals(updatedData.id, updatedData); // id 전달
      navigate(`/records/medicalrecord/${updatedData.id}`);
    } catch (e) {
      setError("의료 기록 저장 중 오류가 발생했습니다.");
    }
  };

  
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!hospitalRecord) return <p>의료 기록을 찾을 수 없습니다.</p>;

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <BackButton onClick={() => navigate(`/records/medicalrecord/${hospitalRecord.id}`)}>
          <ArrowIcon width="25px" height="25px" stroke="black" />
        </BackButton>
        <HeaderTitle>Medical Record</HeaderTitle>
      </Header>

      <div>
        {hospitalRecord && (
          <MedicalEditData initialData={hospitalRecord} onSave={handleSave} />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f9fc;
  padding-top: 24px;
  margin-left: 16px;
  margin-right: 16px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: -13px;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export default MedicalRecordEdit;