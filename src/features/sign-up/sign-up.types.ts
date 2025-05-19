import { z } from "zod";
import { ClassPostProps } from "../diagnosis/ui/Funnel";
import { SignupSchema } from "@/entities/auth/lib/form.schema";
import { COUNTRY_LIST } from "./sign-up.constants";

type SignupFormFields = z.infer<typeof SignupSchema>;

// COUNTRY_LIST에서 name 필드만 추출하여 리터럴 타입으로 정의
type Country = (typeof COUNTRY_LIST)[number]["name"];

interface SignupFunnelProps extends Omit<ClassPostProps, "nextClickHandler"> {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

interface FunnelStepPlateProps {
  label: keyof SignupFormFields;
  children: React.ReactNode;
  onNext: () => void;
  value?: string | number;
}

interface ControllerProps<T> {
  value: T;
  onChange: (value: T) => void;
}

export type {
  SignupFormFields,
  Country,
  SignupFunnelProps,
  FunnelStepPlateProps,
  ControllerProps,
};
