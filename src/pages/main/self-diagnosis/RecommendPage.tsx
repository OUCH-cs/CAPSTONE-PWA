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
  languageCodeAtom,
  destinationAtom
} from '@/features/diagnosis/service/selfDiagnosisAtoms';
import LoadingOverlay from "@/shared/components/overlay/LoadingOverlay";
import  LocationIcon from "@/shared/assets/common/location.svg?react";
import { Button } from "@/shared/components/button/Button";
import { useNavigate } from "react-router-dom";

function RecommendPage() {
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

  const shouldFetch =
  !!system && !!symptom && !!condition;

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
        {destination === "HOSPITAL" ? "Recommended Hospital" : "Identified Symptoms"}
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
        <LocationIcon />
      </IconContainer>

      <ButtonGroup>
        <Button width={416} onClick={handleResetAndSearch}>
          {destination === "HOSPITAL" ? "Find Recommended Hospitals" : "Find Pharmacy"}
        </Button>
        <FinishButton onClick={handleResetAndGoHome}>Finish</FinishButton>
      </ButtonGroup>
    </Container>
  );
}

export { RecommendPage };

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 16px;
  overflow-y: auto;
`;

const Question = styled.p`
  margin-top: 4.5rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const Departments = styled.div`
  font-size: 1.4rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom:1rem;
`;


const Description = styled.p`
  font-size: 1rem;
  color: ${theme.colors.gray_4};
  margin-bottom: 7rem;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6.3rem;
`;

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