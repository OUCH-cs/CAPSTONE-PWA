import useSWR from "swr";
import { getConditions } from "../service/api/conditionApi";
import { getAlgorithm } from "../service/api/conditionApi";
import { DiagnosisAlgorithm } from "../diagnosis.type";

export const useConditions = (
    systems: string, symptom: string, languageCode: string = "en"
) => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        ["/conditions",systems,symptom,languageCode],
        () => getConditions(systems,symptom,languageCode)
    );    

    console.log(data)
    
    return {
        conditions: data,
        isLoading,
        isError: error,
        mutate,
      };

}


export const useAlgorithm = () => {
    const { data, error, isLoading, mutate } = useSWR<DiagnosisAlgorithm []>(
        "/algorithm",
        getAlgorithm
    );    

    console.log(data)
    
    return {
        algorithms: data,
        isLoading,
        isError: error,
        mutate,
      };

}