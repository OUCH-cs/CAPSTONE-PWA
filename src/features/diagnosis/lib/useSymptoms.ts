import useSWR from "swr";
import { getSymptoms } from "../service/api"

export interface Symptom {
    id: number;
    name: string;
  }

export const useSymptoms = () => {
    const { data, error, isLoading, mutate } = useSWR<Symptom[]>(
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