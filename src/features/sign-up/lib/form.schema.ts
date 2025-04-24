import { z } from "zod";
import { FormFields } from "../sign-up.types";

const schema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  gender: z.enum(["MALE", "FEMALE"]),
  nationId: z.number().min(0),
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
  languageId: z.number(),
});

const defaultSignupValues: FormFields = {
  name: "",
  gender: "MALE",
  nationId: -1,
  phoneNumber: "",
  email: "",
  loginId: "",
  password: "",
  nickname: "",
  birthday: "2025-04-24",
  address: "Seoul",
  status: "ACTIVE",
  languageId: 1,
};

export { schema, defaultSignupValues };
