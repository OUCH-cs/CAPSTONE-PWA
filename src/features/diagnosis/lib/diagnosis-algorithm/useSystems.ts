import useSWR from "swr";
import { getSystems } from "../../service/api";

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