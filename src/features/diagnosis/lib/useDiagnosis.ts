import useSWR from "swr";
import { getUserDiagnosis, postDiagnosis } from "../service/api";
import { DiagnosisResponse } from "../diagnosis.type";
import { DiagnosisFormData } from "@/features/diagnosis/diagnosis.type";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const onSubmit = async (formData:DiagnosisFormData) => {
      try {
        const response = await postDiagnosis(formData); 
        alert("Successfully submitted!");
        navigate('/')
        console.log(response.data)
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(`Submission failed: ${e.message}`);
        } else {
          alert("Submission failed due to an unknown error.");
        }
      }
    };

  return {
    onSubmit
  }

  };


  