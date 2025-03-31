import { create } from "zustand";

type DiagnosisState = {
  currentPage: "main" | "add"; 
  setPage: (step: "main" | "add") => void;
};

interface SymptomsState {
  customSymptoms: string[];
  addSymptom: (symptom: string) => void;
  removeSymptom: (symptom: string) => void;
}

// 증상 카테고리 추가 페이지 이동 상태관리
export const useDiagnosisStore = create<DiagnosisState>((set) => ({
  currentPage: "main", 
  setPage: (step) => set({ currentPage: step }),
}));

// 추가 증상 상태관리
export const useSymptomsStore = create<SymptomsState>((set) => ({
  customSymptoms: [],
  addSymptom: (symptom) =>
    set((state) => ({ customSymptoms: [...state.customSymptoms, symptom] })),
  removeSymptom: (symptom) =>
    set((state) => ({ customSymptoms: state.customSymptoms.filter((s) => s !== symptom) })),
}));