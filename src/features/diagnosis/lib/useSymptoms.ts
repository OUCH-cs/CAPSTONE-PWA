import useSWR from "swr";
import { getSymptoms } from "../service/api"

export const useSymptoms = () => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        "/symptoms",
        getSymptoms
    );    

    console.log(data)
    
    return {
        symptoms: data,
        isLoading,
        isError: error,
        mutate,
      };

}