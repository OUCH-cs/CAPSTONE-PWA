import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getHealthStatus, HealthStatus } from "@/features/records/service/healthDataApi";  // API 파일 경로 맞게 수정

export default function HealthStatusData() {
  const [healthStatusData, setHealthStatusData] = useState<HealthStatus | null>(null);  // 상태 저장
  const [loading, setLoading] = useState<boolean>(true);  // 로딩 상태
  const [error, setError] = useState<string | null>(null);  // 에러 상태

  // 데이터 fetch 함수
  const fetchHealthStatusData = async () => {
    try {
      setLoading(true);
      const data = await getHealthStatus();  // getHealthStatus API 호출
      setHealthStatusData(data);  // 데이터 상태 업데이트
    } catch (error: any) {
      setError("건강기록을 불러오는 데 실패했습니다.");  // 오류 처리
      console.error("API 호출 중 오류 발생:", error);
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

  return (
    <Container>
      {/* 데이터가 있을 때만 렌더링 */}
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
            <LabelText>BloodPressure</LabelText>
            <List>{healthStatusData.bloodPressure} mmHg</List>
          </DataLabel>
          <DataLabel>
            <LabelText>BloodSugar</LabelText>
            <List>{healthStatusData.bloodSugar} mg/dL</List>
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

// 스타일 컴포넌트

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
  color: #767676;
  font-size: 14px;
  font-weight: 400;
  font-family: Pretendard;
  margin-bottom:10px;
`;

const List = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  margin-bottom: -10px;
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
