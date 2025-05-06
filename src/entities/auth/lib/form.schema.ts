import { z } from "zod";
import { SignupFormFields } from "@/features/sign-up/sign-up.types";
import { SigninFormFields } from "@/features/sign-in/sign-in.types";

const SignupSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  gender: z.enum(["MALE", "FEMALE"]),
  nationCode: z.string().min(1),
  phoneNumber: z.string().regex(/^\d{3}-\d{4}-\d{4}$/, {
    message: "Invalid phone number format",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  loginId: z.string().min(1, { message: "Please enter your ID" }),
  password: z
    .string()
    .min(8, {
      message:
        "Password must be at least 8 characters long and include both letters and numbers",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: "Password must include at least one letter and one number",
    }),
  nickname: z.string().min(1),
  birthday: z.string(),
  address: z.string(),
  status: z.string(),
  languageCode: z.string(),
});

const SigninSchema = z.object({
  loginId: z.string().min(1, { message: "Please enter your ID" }),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: "Password is not valid",
  }),
});

const defaultSignupValues: SignupFormFields = {
  name: "",
  gender: "MALE",
  nationCode: "",
  phoneNumber: "",
  email: "",
  loginId: "",
  password: "",
  nickname: "",
  birthday: "2025-04-24",
  address: "Seoul",
  status: "ACTIVE",
  languageCode: "en",
};

const defaultSigninValues: SigninFormFields = {
  loginId: "",
  password: "",
};

export { SignupSchema, SigninSchema, defaultSignupValues, defaultSigninValues };
