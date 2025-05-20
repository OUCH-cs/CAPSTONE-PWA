import styled from "@emotion/styled";
import theme from '@/shared/styles/theme';
import { useRecommend } from '../../../features/diagnosis/lib/useRecommend';
import { RecommendRequest } from '../../../features/diagnosis/diagnosis.type';
import { useMemo } from "react";
import { useAtom } from "jotai";
import { selectedSystemAtom, selectedConditionAtom ,selectedSymptomAtom} from '@/features/diagnosis/service/selfDiagnosisAtoms';
import LoadingOverlay from "@/shared/components/overlay/LoadingOverlay";

function RecommendPage (){
      const [symptom] = useAtom(selectedSymptomAtom);
      const [system] = useAtom(selectedSystemAtom);
      const [condition] = useAtom(selectedConditionAtom);

    const input: RecommendRequest = useMemo(() => ({
        language: "en",
        system ,
        symptom,
        condition,
      }), [system, symptom, condition]); 
      
      const { response, isLoading } = useRecommend(input);
  
    
    return (
        <Container>
            {isLoading && <LoadingOverlay/>}
            <Question>Recommended Hospital</Question>
            <Departments>- {response?.data.departments?.[0]?.en}</Departments>
            <Description>{response?.data.note?.en}</Description>
            <div>{response?.data.condition?.en}</div>
            <div>여기에는 svg</div>
            <div>여기에는 버튼</div>
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
  margin-top:10.5rem;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 3.5rem;
`
const Departments = styled.div`
  font-size: 16px;
  line-height: 1.4;

`
const Description = styled.p`
  font-size: 14px;
  color: #555;
  text-align: center;
  margin: 12px 0 24px;
`;