import useSWR from "swr";
import { getSymptoms } from "../../service/api";

export const useSymptoms = (
    systems: string, languageCode: string
) => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        ['/symptoms', systems, languageCode], 
        () => getSymptoms(systems, languageCode) 
    );    

    return {
        symptoms: data,
        isLoading,
        isError: error,
        mutate,
      };

}