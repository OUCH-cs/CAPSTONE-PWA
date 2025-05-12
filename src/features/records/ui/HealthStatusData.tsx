import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getHealthStatus, HealthStatus } from "@/features/records/service/healthDataApi"; 
export default function HealthStatusData() {
  const [healthStatusData, setHealthStatusData] = useState<HealthStatus | null>(null);  // 상태 저장
  const [loading, setLoading] = useState<boolean>(true);  // 로딩 상태
  const [error, setError] = useState<string | null>(null);  // 에러 상태

  // 데이터 fetch 함수
  const fetchHealthStatusData = async () => {
    try {
      setLoading(true);
      const data = await getHealthStatus(); 
      setHealthStatusData(data.data);  // 데이터 상태 업데이트
    } catch (error: any) {
      setError("건강기록을 불러오는 데 실패했습니다."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthStatusData();  // 컴포넌트가 마운트될 때 데이터 불러오기
  }, []);

  // 로딩 중일 때 처리
  if (loading) {
    return <LoadingText>데이터를 불러오는 중...</LoadingText>;
  }

  // 오류 처리
  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }
  const formatBloodPressure = (bloodPressure: number) => {
    if (!bloodPressure) return " / "; 
    const contraction = Math.floor(bloodPressure / 1000); // 수축기
    const relaxation = bloodPressure % 1000; // 이완기
    return `${contraction} / ${relaxation}`;
  };
  const formatBloodSugar = (bloodSugar: number) => {
    if (!bloodSugar) return " / ";
    const fasting = Math.floor(bloodSugar / 1000); // 공복 혈당
    const postprandial = bloodSugar % 1000; // 식후 혈당
    return `${fasting} / ${postprandial}`;
  };



  return (
    <Container>
      {healthStatusData ? (
        <>
          <DataLabel>
            <LabelText>Dieases</LabelText>
            <List>{healthStatusData.disease}</List>
          </DataLabel>
          <DataLabel>
            <LabelText>Allergy</LabelText>
            <List>{healthStatusData.allergy}</List>
          </DataLabel>
          <DataLabel>
            <LabelText>Blood Pressure</LabelText>
            <List>{formatBloodPressure(healthStatusData.bloodPressure)} <Unit>mmHg</Unit></List>
          </DataLabel>
          <DataLabel>
            <LabelText>BloodSugar</LabelText>
            <List>{formatBloodSugar(healthStatusData.bloodSugar)} <Unit>mg/dL</Unit></List>
          </DataLabel>
          <DataLabel>
            <LabelText>MedicineHistory</LabelText>
            <List>{healthStatusData.medicineHistory}</List>
          </DataLabel>
        </>
      ) : (
        <NoDataText>건강 기록이 없습니다.</NoDataText>
      )}
    </Container>
  );
}


const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  position: relative;
`;

const DataLabel = styled.div`
  margin-top: 32px;
  margin-bottom: 6px;
`;

const LabelText = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 400;
  font-family: Pretendard;
  margin-bottom:10px;
`;

const List = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #E5E5EC;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-bottom: -10px;
   font-size: 16px;
  font-weight: 400;
  color: #434343;
  font-family: Pretendard;
`;
  const Unit = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 4px;
  color: #434343;
`;
const LoadingText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #767676;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 16px;
  color: red;
`;

const NoDataText = styled.p`
  font-size: 16px;
  color: #767676;
  text-align: center;
  margin-top: 40px;
`;
