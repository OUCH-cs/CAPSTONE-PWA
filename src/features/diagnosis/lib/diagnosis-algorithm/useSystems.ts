import useSWR from "swr";
import { getSystems } from "../../service/api";

export const useSystems = (languageCode: string) => {
    const { data, error, isLoading, mutate } = useSWR<string[]>(
        ["/systems",languageCode],
        ()=>getSystems(languageCode)
    );    
    return {
        systems: data,
        isLoading,
        isError: error,
        mutate,
      };

}