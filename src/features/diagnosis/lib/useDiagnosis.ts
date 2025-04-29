import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getUserDiagnosis, postDiagnosis } from "../service/api";
import { DiagnosisResponse } from "../diagnosis.type";
  
export const useUserDiagnosis = (userId: number) => {
    const { data, error, isLoading, mutate } = useSWR<DiagnosisResponse[]>(
      userId ? `/self-diagnosis/get-all/${userId}` : null,
      () => getUserDiagnosis(userId)
    );
  
    return {
      diagnosis: data,
      isLoading,
      isError: !!error,
      mutate,
    };
  };




export const useSubmitDiagnosis = () => {
    const { trigger, isMutating, data, error } = useSWRMutation(
      "/self-diagnosis",
      postDiagnosis
    );
  
    return {
      submit: trigger,
      isLoading: isMutating,
      result: data,
      error,
    };
  };