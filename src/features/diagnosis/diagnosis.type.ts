import { FunnelProps } from "@/shared/lib/funnel";

export type DiagnosisFormData = {
  userId: number;
  visitType: "HOSPITAL" | "PHARMACY";
  symptom: string;
  duration: "LESS_THAN_1_DAY" | "ONE_TO_3_DAYS" | "MORE_THAN_3_DAYS" | "MORE_THAN_1_WEEK" | "MORE_THAN_1_MONTH"|"";
  painSeverity: number; // 0 ~ 10
  additionalNote?: string;
};

export interface DiagnosisResponse {
  userId: number;
  visitType: "HOSPITAL" | "PHARMACY";
  symptom: string;
  duration: "LESS_THAN_1_DAY" | "ONE_TO_3_DAYS" | "MORE_THAN_3_DAYS" | "MORE_THAN_1_WEEK" | "MORE_THAN_1_MONTH" ;
  painSeverity: number;
  additionalNote?: string;
}

export interface DiagnosisPostProps {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  prevClickHandler: () => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}


export interface RecommendRequest {
  language: string;       
  system: string;         
  symptom: string;      
  condition: string | null; 
}

export type DestinationType = "HOSPITAL" | "PHARMACY";

export interface SelectDestinationProps {
  selectedDestination?: DestinationType; 
}

export interface StepProps {
  data?: DiagnosisAlgorithm[];
  onNext: () => void;
  onPrev: () => void;
}

export interface StepSixProps {
  onPrev: () => void;
}

export interface ConditionsProps {
  system: string;
  symptom: string;
  languageCode:string;
}

export interface StepConditionsProps {
  data?: DiagnosisAlgorithm[];
  system: string;
  symptom: string;
  languageCode: string;
  onNext: () => void;
  onPrev: () => void;
}

export interface ProgressBarProps {
  progress: number; // 0~100
  currentStep: string;
}

export interface DiagnosisAlgorithm {
  type: string;
  system: {
    ko: string;
    en: string;
  };
  symptom: {
    ko: string;
    en: string;
  };
  condition: {
    ko: string;
    en: string;
  };
  departments: {
    ko: string;
    en: string;
  }[];
  note: {
    ko: string;
    en: string;
  };
}

export interface LanguageResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

export interface NameCodeData {
  name: string;
  code: string;
}

