import { useAtom } from "jotai";
import { isAuthAtom } from "@/features/sign-in/services/atoms";
import { SubmitHandler, useForm } from "react-hook-form";
import { SigninFormFields } from "../sign-in.types";
import {
  defaultSigninValues,
  SigninSchema,
} from "@/entities/auth/lib/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import apiRequest from "@/shared/api/apiRequest";
import { useNavigate } from "react-router-dom";

export const useSigninForm = () => {
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormFields>({
    defaultValues: defaultSigninValues,
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit: SubmitHandler<SigninFormFields> = async (data) => {
    try {
      await apiRequest({
        url: "/users/login",
        method: "POST",
        data,
      });
      setIsAuth(!isAuth);
      navigate("/");
    } catch (error) {
      alert(`An error occurred during login. Please try again.`);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
