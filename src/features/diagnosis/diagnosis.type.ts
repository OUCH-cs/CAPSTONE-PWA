export type DiagnosisFormData = {
    userId: number;
    visitType: "HOSPITAL" | "PHARMACY";
    symptom: string;
    duration: "LESS_THAN_1_DAY" | "ONE_TO_3_DAYS" | "MORE_THAN_3_DAYS" | "MORE_THAN_1_WEEK" | "MORE_THAN_1_MONTH";
    painSeverity: number; // 0 ~ 10
    additionalNote?: string;
  };

  export interface DiagnosisResponse {
    userId: number;
    visitType: "HOSPITAL" | "PHARMACY";
    symptom: string;
    duration: "LESS_THAN_1_DAY" | "ONE_TO_3_DAYS" | "MORE_THAN_3_DAYS" | "MORE_THAN_1_WEEK" | "MORE_THAN_1_MONTH";
    painSeverity: number;
    additionalNote?: string;
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
    onNext?: () => void;
    onPrev?: () => void;
  }

  export interface ProgressBarProps {
    progress: number; // 0~100
    currentStep: string;
  }