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
  const [healthStatusData, setHealthStatusData] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setIsAuth = useSetAtom(isAuthAtom);

  const fetchHealthStatusData = async () => {
    try {
      setLoading(true);
      const data = await getHealthStatus();
      setHealthStatusData(data.data);
      setError(null);
    } catch (error) {
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
    fetchHealthStatusData();
  }, []);

  if (loading) {
    return <LoadingText>데이터를 불러오는 중...</LoadingText>;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <Container>
      {healthStatusData ? (
        <>
          <DataLabel>
            <LabelText>{t("Disease")}</LabelText>
            <List>{healthStatusData.disease || ""}</List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("Allergy")}</LabelText>
            <List>{healthStatusData.allergy || ""}</List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("Blood Pressure")}</LabelText>
            <List>
              {healthStatusData.bloodPressure
                ? `${formatMeasurement(healthStatusData.bloodPressure)}`
                : ""}
              <Unit>{healthStatusData.bloodPressure ? "mmHg" : ""}</Unit>
            </List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("BloodSugar")}</LabelText>
            <List>
              {healthStatusData.bloodSugar
                ? `${formatMeasurement(healthStatusData.bloodSugar)}`
                : ""}
              <Unit>{healthStatusData.bloodSugar ? "mg/dL" : ""}</Unit>
            </List>
          </DataLabel>
          <DataLabel>
            <LabelText>{t("MedicineHistory")}</LabelText>
            <List>{healthStatusData.medicineHistory || ""}</List>
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
  min-height: 60px;
  margin-bottom: -10px;
  font-size: 16px;
  font-weight: 400;
  color: #434343;
  font-family: Pretendard;
   word-break: break-word;   
  white-space: pre-wrap;    
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
