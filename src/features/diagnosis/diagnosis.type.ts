export type DiagnosisFormData = {
    userId: number;
    visitType: "HOSPITAL" | "PHARMACY";
    symptoms: string[];
    duration: "LESS_THAN_DAY" | "ONE_TO_THREE_DAYS" | "MORE_THAN_THREE_DAYS" | "MORE_THAN_WEEK" | "MORE_THAN_MONTH";
    painSeverity: number; // 0 ~ 10
    additionalNote?: string;
  };
  
  
  export interface DiagnosisResponse {
    id: number;
    visitType: "HOSPITAL" | "PHARMACY";
    symptoms: string[];
    duration: "LESS_THAN_DAY" | "ONE_TO_THREE_DAYS" | "MORE_THAN_THREE_DAYS" | "MORE_THAN_WEEK" | "MORE_THAN_MONTH";
    painSeverity: number;
    additionalNote?: string;
  }
  
  export type DestinationType = "HOSPITAL" | "PHARMACY";
  
  export interface SelectDestinationProps {
    selectedDestination?: DestinationType; 
  }
  
  export interface StepProps {
    onNext: () => void;
  }

  export interface ProgressBarProps {
    progress: number; // 0~100
    currentStep: string;
  }