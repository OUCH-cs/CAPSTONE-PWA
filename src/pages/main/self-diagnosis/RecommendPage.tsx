import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import theme from "@/shared/styles/theme";
import { useRecommend } from "../../../features/diagnosis/lib/useRecommend";
import { RecommendRequest } from "../../../features/diagnosis/diagnosis.type";
import { useMemo } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  selectedSystemAtom,
  selectedConditionAtom,
  selectedSymptomAtom,
  destinationAtom
} from '@/features/diagnosis/service/selfDiagnosisAtoms';
import { useLanguage } from "@/shared/services/useLanguage";
import LoadingOverlay from "@/shared/components/overlay/LoadingOverlay";
import LocationImg from "@/shared/assets/common/location.png";
import { Button } from "@/shared/components/button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans} from "react-i18next";
import { departmentFilterAtom } from "@/features/search/services/store/filterAtom";

function RecommendPage() {
  const {t} = useTranslation()
  const setDepartments = useSetAtom(departmentFilterAtom);

  const navigate = useNavigate();
  const [symptom, setSymptom] = useAtom(selectedSymptomAtom);
  const [system, setSystem] = useAtom(selectedSystemAtom);
  const [condition, setCondition] = useAtom(selectedConditionAtom);
  const {languageCode} =useLanguage();
  const [destination, setDestination] = useAtom(destinationAtom);

  const input: RecommendRequest = useMemo(
    () => ({
      language : languageCode,
      system,
      symptom,
      condition,
    }),
    [system, symptom, condition,languageCode,]
  );

  const shouldFetch = !!system && !!symptom;

  const { response, isLoading } = useRecommend(shouldFetch ? input : null);

  const handleResetAndGoHome = () => {
    navigate("/");
    setSymptom("");
    setSystem("");
    setCondition("");
    setDestination("HOSPITAL");
  };

  const handleResetAndSearch = () => {
    setSymptom("");
    setSystem("");
    setCondition("");
    setDestination("HOSPITAL");

    // 검색 페이지로 이동 후 검색 필터링
    navigate("/search");
    setDepartments(response?.data.departments[0].ko);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      {isLoading && <LoadingOverlay />}
      <Question>
      <Trans i18nKey={destination === "HOSPITAL" ? "Recommend" : "Identified Symptoms"}/>
      </Question>
      {destination === "HOSPITAL" ? (
        <>
          {response?.data.departments.map(
            (dept: Record<string, string>, index: number) => (
              <Departments key={index}>- {dept[languageCode]}</Departments>
            )
          )}
          <Description>{response?.data.note[languageCode]}</Description>
        </>
      ) : (
        <>
          <Departments>- {response?.data.system[languageCode]}</Departments>
          {response?.data.condition?.[languageCode].length && (
            <SystemText>- {response?.data.condition[languageCode]}</SystemText>
          )}
        </>
      )}
      <IconContainer>
        <img src={LocationImg} alt="location-image" width="180" height="180"/>
      </IconContainer>
      <ButtonGroup>
        <FindButton onClick={handleResetAndSearch}>
          {destination === "HOSPITAL"
            ? t("Find Recommended Hospitals")
            : t("Find Pharmacy")}
        </FindButton>
        <FinishButton onClick={handleResetAndGoHome}>{t("Finish")}</FinishButton>
      </ButtonGroup>
    </Container>
  );
}

export { RecommendPage };
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 16px;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Question = styled.p`
  margin-top: 4.5rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  white-space: pre-line;
  font-weight: 600;
`;

const Departments = styled.div`
  font-size: 1.7rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${theme.colors.primary};
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray_4};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
  margin-bottom: 6.3rem;
`;

const SystemText = styled.p`
font-size: 1.7rem;
color: ${theme.colors.gray_4};
line-height: 1.4;
font-weight: 600;
`;
const FindButton = styled(Button)`
  width: 100%;
  font-weight: 500;
`;

const FinishButton = styled.button`
  height: 48px;
  font-size: 1rem;
  background-color: ${theme.colors.background};
  border: none;
  color: ${theme.colors.black};
  cursor: pointer;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
