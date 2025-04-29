import useSWR from "swr";
import { getSymptoms } from "../service/api"

export interface Symptom {
    id: number;
    name: string;
  }


  //무조건 캐싱
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