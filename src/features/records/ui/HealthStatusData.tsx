import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import {
  getHealthStatus,
  HealthStatus,
} from "@/features/records/service/healthDataApi";
import { formatMeasurement } from "@/features/records/lib/BloodForm";
import { useTranslation } from "react-i18next";
import { useSetAtom } from "jotai";
import { isAuthAtom } from "@/features/sign-in/services/atoms";

export default function HealthStatusData() {
  const { t } = useTranslation();
  const [healthStatusData, setHealthStatusData] = useState<HealthStatus | null>(
    null
  ); // 상태 저장
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const navigate = useNavigate();
  const setIsAuth = useSetAtom(isAuthAtom);

  // 데이터 fetch 함수
  const fetchHealthStatusData = async () => {
    try {
      setLoading(true);
      const data = await getHealthStatus();
      setHealthStatusData(data.data);
      setError(null);
    } catch (error) {
      // 어떤 에러든 로그인 페이지로 이동
      localStorage.removeItem("accessToken");
      setIsAuth(false);
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      navigate("/sign-in");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthStatusData(); // 컴포넌트가 마운트될 때 데이터 불러오기
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
      {healthStatusData ? (
        <>
          <DataLabel>
            <LabelText>{t("Disease")}</LabelText>
            <List>{healthStatusData.disease || t("e.g. diabetes, colic")}</List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("Allergy")}</LabelText>
            <List>{healthStatusData.allergy || t("e.g. pollen, sellfish, peach")}</List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("Blood Pressure")}</LabelText>
            <List>
                {healthStatusData.bloodPressure
                ? `${formatMeasurement(healthStatusData.bloodPressure)}`
                : "138 / 75"}
              <Unit>mmHg</Unit>
            </List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("BloodSugar")}</LabelText>
            <List>
               {healthStatusData.bloodSugar
              ? `${formatMeasurement(healthStatusData.bloodSugar)}`
            : "90 / 164"}
              <Unit>mg/dL</Unit>
            </List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("MedicineHistory")}</LabelText>
            <List>{healthStatusData.medicineHistory || t("e.g. Aspirin")}</List>
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
  margin-bottom: 10px;
`;

const List = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #e5e5ec;
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
