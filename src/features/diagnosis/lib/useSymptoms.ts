import useSWR from "swr";
import { getSystems,getSymptoms } from "../service/api"

export const useSystems = () => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        "/systems",
        getSystems
    );    
    return {
        systems: data,
        isLoading,
        isError: error,
        mutate,
      };

}

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