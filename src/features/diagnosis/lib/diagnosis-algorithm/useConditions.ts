import useSWR from "swr";
import { getConditions } from "../../service/api";

export const useConditions = (
    systems: string, symptom: string, languageCode: string 
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