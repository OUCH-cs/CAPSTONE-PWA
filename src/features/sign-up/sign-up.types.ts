import { z } from "zod";
import { ClassPostProps } from "../diagnosis/ui/Funnel";
import { schema } from "./lib/schema";
import { COUNTRY_LIST } from "./sign-up.constants";

type FormFields = z.infer<typeof schema>;

// COUNTRY_LIST에서 name 필드만 추출하여 리터럴 타입으로 정의
type Country = (typeof COUNTRY_LIST)[number]["name"];
// 결과: "South Korea" | "China" | "Russia" | "Japan" | "France" | "England" | "Germany" | "Italy" | "Spain" | "Portugal"

interface SignupFunnelProps extends Omit<ClassPostProps, "nextClickHandler"> {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

interface FunnelStepPlateProps {
  label: keyof FormFields;
  children: React.ReactNode;
  onNext: () => void;
  value?: string | number;
}

interface ControllerProps<T> {
  value: T;
  onChange: (value: T) => void;
}

export type {
  FormFields,
  Country,
  SignupFunnelProps,
  FunnelStepPlateProps,
  ControllerProps,
};
