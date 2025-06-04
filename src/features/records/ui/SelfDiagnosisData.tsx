import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getDiagnosisById } from "@/features/records/service/diagnosisApi";
import { useTranslation } from "react-i18next";

interface Diagnosis {
  diagnosisId: number;
  visitType: "HOSPITAL" | "PHARMACY";
  symptoms: string;
  duration:
  | "LESS_THAN_A_DAY"
  | "ONE_TO_3_DAYS"
  | "MORE_THAN_3_DAYS"
  | "MORE_THAN_A_WEEK"
  | "MORE_THAN_A_MONTH";
  painSeverity: number;
  additionalNote: string;
  createdAt: string;
}

interface SelfDiagnosisDataProps {
  id: string;
}

const SelfDiagnosisData: React.FC<SelfDiagnosisDataProps> = ({ id }) => {
  const {t} = useTranslation();
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const data = await getDiagnosisById(Number(id));
        setDiagnosis(data.data);
      } catch (error) {
        setError("자가진단 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [id]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      {diagnosis ? (
        <>
          <DataBlock>
            <Label>{t("Date of visit")} </Label>
            <ListBox>
              <ListText>{diagnosis.createdAt}</ListText>
            </ListBox>
          </DataBlock>

          <DataBlock>
            <Label>{t("Visiting Hospital / Pharmacy")} </Label>
            <ListBox>
              <ListText>{t(diagnosis.visitType) }</ListText>
            </ListBox>
          </DataBlock>

          <DataBlock>
            <Label>{t("Symptoms")} </Label>
            <ListBox>
              <ListText>{diagnosis.symptoms}</ListText>
            </ListBox>
          </DataBlock>

          <DataBlock>
            <Label>{t("Duration of symptoms")} </Label>
            <ListBox>
              <ListText>{t(`duration.${diagnosis.duration}`)}</ListText>
            </ListBox>
          </DataBlock>

          <DataBlock>
            <Label>{t("Severity of SymptomsList(0~10)")} </Label>
            <ListBox>
              <ListText>{diagnosis.painSeverity}</ListText>
            </ListBox>
          </DataBlock>

          <DataBlock>
            <Label>{t("Additional Notes")} </Label>
            <ListBox>
              <ListText>{diagnosis.additionalNote}</ListText>
            </ListBox>
          </DataBlock>
        </>
      ) : (
        <p>자가진단 기록을 찾을 수 없습니다.</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f9fc;
  position: relative;
`;

const DataBlock = styled.div`
  margin-top: 32px;
  margin-bottom: 6px;
`;

const Label = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 400;
  font-family: Pretendard;
`;

const ListBox = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: #F1F1F5;
  border: 1px solid #E5E5EC;
  min-height: 60px;
  margin-top: 10px;
  margin-bottom: -10px;
   word-break: break-word;   
  white-space: pre-wrap;    
`;

const ListText = styled.span`
  color: #434343;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
`;

export default SelfDiagnosisData;
