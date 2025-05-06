import { SigninSchema } from "@/entities/auth/lib/form.schema";
import { z } from "zod";

type SigninFormFields = z.infer<typeof SigninSchema>;

export type { SigninFormFields };
