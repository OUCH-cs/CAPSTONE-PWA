import styled from "@emotion/styled";
import theme from '@/shared/styles/theme';
import { useRecommend } from '../../../features/diagnosis/lib/useRecommend';
import { RecommendRequest } from '../../../features/diagnosis/diagnosis.type';
import { useMemo } from "react";
import { useAtom } from "jotai";
import {
  selectedSystemAtom,
  selectedConditionAtom,
  selectedSymptomAtom,
  destinationAtom
} from '@/features/diagnosis/service/selfDiagnosisAtoms';
import { languageCodeAtom } from "@/shared/services/languageCodeAtom";
import LoadingOverlay from "@/shared/components/overlay/LoadingOverlay";
import LocationImg from "@/shared/assets/common/location.png"
import { Button } from "@/shared/components/button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function RecommendPage() {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const [symptom, setSymptom] = useAtom(selectedSymptomAtom);
  const [system, setSystem] = useAtom(selectedSystemAtom);
  const [condition, setCondition] = useAtom(selectedConditionAtom);
  const [language] = useAtom(languageCodeAtom);
  const [destination, setDestination] = useAtom(destinationAtom);

  const input: RecommendRequest = useMemo(() => ({
    language,
    system,
    symptom,
    condition,
  }), [system, symptom, condition, language]);

  const shouldFetch = !!system && !!symptom ;
 
  const { response, isLoading } = useRecommend(shouldFetch ? input : null);

  const handleResetAndGoHome = () => {
    navigate("/");
    setSymptom("");
    setSystem("");
    setCondition("");
    setDestination("HOSPITAL"); 
  };

  const handleResetAndSearch = () => {
    navigate("/search");
    setSymptom("");
    setSystem("");
    setCondition("");
    setDestination("HOSPITAL");
  };

  return (
    <Container>
      {isLoading && <LoadingOverlay />}
      <Question>
        {destination === "HOSPITAL" ? t("Recommended Hospital") : t("Identified Symptoms")}
      </Question>
      {destination === "HOSPITAL" ? (
        <>
          {response?.data.departments.map((dept: Record<string, string>, index: number) => (
            <Departments key={index}>- {dept[language]}</Departments>
          ))}
          <Description>{response?.data.note[language]}</Description>
        </>
      ) : (
        <>
          <Departments>- {response?.data.system[language]}</Departments>
          {response?.data.condition?.[language].length && (
            <Departments>- {response?.data.condition[language]}</Departments>
          )}
        </>
      )}
      <IconContainer>
        <img src={LocationImg} alt="location-image" />
      </IconContainer>
      <ButtonGroup>
        <FindButton onClick={handleResetAndSearch}>
          {destination === "HOSPITAL" ? t("Find Recommended Hospitals") : t("Find Pharmacy")}
        </FindButton>
        <FinishButton onClick={handleResetAndGoHome}>{t("Finish")}</FinishButton>
      </ButtonGroup>
    </Container>
  );
}

export { RecommendPage };

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 16px;
  overflow: hidden;
`;

const Question = styled.p`
  margin-top: 4.5rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;
`;

const Departments = styled.div`
  font-size: 1.7rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom:1rem;
`;


const Description = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray_4};
  margin-bottom: 7rem;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6.3rem;
`;

const FindButton = styled(Button)`
  width:100%;
`

const FinishButton = styled.button`
  height: 48px;
  font-size: 1rem;
  background-color: ${theme.colors.background};
  border: none;
  color: ${theme.colors.black};
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;