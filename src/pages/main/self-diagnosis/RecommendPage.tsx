import * as S from '../../../features/diagnosis/ui/common'
import { useRecommend } from '../../../features/diagnosis/lib/useRecommend';
import { RecommendRequest } from '../../../features/diagnosis/diagnosis.type';
import { useMemo } from "react";

function RecommendPage (){
    const input: RecommendRequest = useMemo(() => ({
        language: "en",
        system: "Digestive",
        symptom: "Diarrhea",
        condition: null,
      }), []); 
      
      const { response } = useRecommend(input);
  
    
    return (
        <S.Container>
            <S.Question>Recommended Hospital</S.Question>
            <div>{response?.data.departments?.[0]?.en}</div>
            <div>{response?.data.note?.en}</div>
            <div>여기에는 svg</div>
            <div>여기에는 버튼</div>
        </S.Container>

    )



}

export {RecommendPage}