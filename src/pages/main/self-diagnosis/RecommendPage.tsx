import styled from "@emotion/styled";
import theme from '@/shared/styles/theme';
import { useRecommend } from '../../../features/diagnosis/lib/useRecommend';
import { RecommendRequest } from '../../../features/diagnosis/diagnosis.type';
import { useMemo } from "react";
import { useAtom } from "jotai";
import { selectedSystemAtom, selectedConditionAtom ,selectedSymptomAtom, languageCodeAtom, destinationAtom} from '@/features/diagnosis/service/selfDiagnosisAtoms';
import LoadingOverlay from "@/shared/components/overlay/LoadingOverlay";
import Location from "@/shared/assets/common/location.svg?react"
import { Button } from "@/shared/components/button/Button";
import { useNavigate } from "react-router-dom";


function RecommendPage (){
      const navigate = useNavigate()
      const [symptom] = useAtom(selectedSymptomAtom);
      const [system] = useAtom(selectedSystemAtom);
      const [condition] = useAtom(selectedConditionAtom);
      const [language] = useAtom(languageCodeAtom)
      const [destination] = useAtom(destinationAtom)

    const input: RecommendRequest = useMemo(() => ({
        language,
        system ,
        symptom,
        condition,
      }), [system, symptom, condition,language]); 
      
      const { response, isLoading } = useRecommend(input);
  
    
    return (
        <Container>
            {isLoading && <LoadingOverlay/>}
            <Question>{`Recommended ${destination}`}</Question>
            {response?.data.departments.map((dept: Record<string, string>, index: number) => (
            <Departments key={index}>
              - {dept[language]}
            </Departments>
            ))}
            <Description>{response?.data.note[language]}</Description>
            <Condition>{response?.data.condition}</Condition>
            <IconContainer>
              <Location/>
            </IconContainer>
            <ButtonGroup>
              {destination === "HOSPITAL" ? (
                <Button width={416}>
                  Find Recommended Hospitals
                </Button>
              ) : (
                <Button width={416}>
                  Find Recommended pharmacy
                </Button>
              )}
                <FinishButton onClick={() => {navigate("/")}}>
                  finish
                </FinishButton>
            </ButtonGroup>
        </Container>

    )

}

export {RecommendPage}


const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 16px;
  overflow-y: auto;
`;

const Question = styled.p`
  margin-top:6.5rem;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight:600;
`
const Departments = styled.div`
  font-size: 1.4rem;
  line-height: 1.4;
  font-weight:600;
`
const Condition = styled.div`
  font-size: 1.4rem;
  line-height: 1.4;
  font-weight: 600;
`
const Description = styled.p`
  font-size: 1rem;
  color: ${theme.colors.gray_4};
  margin: 12px 0 24px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4.3rem;
`;

const FinishButton = styled.button`
  display: flex;
  justify-content: center;
  background-color:${theme.colors.background};
  height: 48px;
  font-size: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;         
  gap: 0.5rem;
`;
