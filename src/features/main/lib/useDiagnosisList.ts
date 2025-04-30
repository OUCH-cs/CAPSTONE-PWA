import useSWR from "swr";
import { getDiagnosisList } from "../service/api";
import { DiagnosisResponse } from "@/features/diagnosis/diagnosis.type";

  //무조건 캐싱
export const useDiagnosisList = () => {
    const { data, error, isLoading, mutate } = useSWR<DiagnosisResponse[]>(
        "/diagnosisList",
        getDiagnosisList
    );    

    console.log(data)
    
    return {
        diagnosisList: data,
        isLoading,
        isError: error,
        mutate,
      };

}