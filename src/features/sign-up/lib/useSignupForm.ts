import { zodResolver } from "@hookform/resolvers/zod";
import apiRequest from "@/shared/api/apiRequest";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields } from "../sign-up.types";
import { defaultSignupValues, schema } from "./form.schema";

export const useSignupForm = () => {
  const navigate = useNavigate();

  const methods = useForm<FormFields>({
    defaultValues: defaultSignupValues,
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await apiRequest({
        url: "/users/signup",
        method: "POST",
        data,
      });
      navigate("/sign-up/success");
    } catch (error) {
      alert(`오류가 발생했습니다: ${error}`);
    }
  };

  return {
    methods,
    register,
    control,
    errors,
    watch,
    handleSubmit,
    onSubmit,
  };
};
