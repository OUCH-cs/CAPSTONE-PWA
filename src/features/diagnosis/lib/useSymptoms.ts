import useSWR from "swr";
import { getSystems,getSymptoms } from "../service/api"

export const useSystems = () => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        "/systems",
        getSystems
    );    

    console.log(data)
    
    return {
        systems: data,
        isLoading,
        isError: error,
        mutate,
      };

}


export const useSymptoms = (
    systems: string, languageCode: string = "en"
) => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        ['/symptoms', systems, languageCode], 
        () => getSymptoms(systems, languageCode) 
    );    

    console.log(data)
    
    return {
        symptoms: data,
        isLoading,
        isError: error,
        mutate,
      };

}