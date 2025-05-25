import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import { getHealthStatus, editHealthStatus, HealthStatus } from "@/features/records/service/healthDataApi";
import HealthEditData from "@/features/records/ui/HealthEditData"; 

const HealthStatusEdit: React.FC = () => {
  const navigate = useNavigate();

  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHealthStatus();
        setHealthStatus(data);
      } catch (e: any) {
        setError("건강 상태 정보를 불러오는 데 실패했습니다. 네트워크를 확인해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (updatedData: HealthStatus) => {
    try {
      // 혈압과 혈당을 숫자 형식으로 변환하여 저장
      const updatedDataWithNumbers = {
        ...updatedData,
        bloodPressure: Number(updatedData.bloodPressure),
        bloodSugar: Number(updatedData.bloodSugar),
      };
      await editHealthStatus(updatedDataWithNumbers);
      navigate("/records/healthstatus");
    } catch (e: any) {
      setError("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!healthStatus) return <p>건강 상태 정보를 찾을 수 없습니다.</p>;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/records/healthstatus")}>
          <ArrowIcon width="25px" height="25px" stroke="black" />
        </BackButton>
        <HeaderTitle>Health Status</HeaderTitle>
      </Header>

      <div>
        <HealthEditData initialData={healthStatus} onSave={handleSave} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f9fc;
  padding: 24px 16px 40px;
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

export default HealthStatusEdit;