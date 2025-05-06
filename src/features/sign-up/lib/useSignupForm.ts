import { zodResolver } from "@hookform/resolvers/zod";
import apiRequest from "@/shared/api/apiRequest";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormFields } from "../sign-up.types";
import {
  defaultSignupValues,
  SignupSchema,
} from "@/entities/auth/lib/form.schema";

export const useSignupForm = () => {
  const navigate = useNavigate();

  const methods = useForm<SignupFormFields>({
    defaultValues: defaultSignupValues,
    resolver: zodResolver(SignupSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      await apiRequest({
        url: "/users/signup",
        method: "POST",
        data,
      });
      navigate("/sign-up/success");
    } catch (error) {
      alert(`An error occurred during sign-up. Please try again.`);
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
