// 병원 목록
const hospitals = [
  { name: 'Hanyang Hospital', date: '2024.11.20' },
  { name: 'Seoul Hospital', date: '2024.11.21' },
  { name: 'Busan Hospital', date: '2024.11.22' },
  { name: 'Incheon Hospital', date: '2024.11.23' },
  { name: 'Daegu Hospital', date: '2024.11.24' },
];

// 초기 입력 양식
const initialMedicalFormData = [
  { title: "Date of Visit", value: "", editable: true },
  { title: "Visiting Hospital", value: "", editable: true },
  { title: "Medical Subjects", value: "", editable: true },
  { title: "Symptoms", value: "", editable: true },
  { title: "Treatment Summary", value: "", editable: true },
];

// 의학 정보 (예시용)
const medicalData = [
  { title: "Date of visit", value: "2024.11.24" },
  { title: "Visiting Hospital", value: "Hanyang Hospital" },
  { title: "Medical Subjects", value: "Internal Medicine" },
  { title: "Symptoms", value: "Fever, Cough" },
  { title: "Treatment Summary", value: "Prescribed antibiotics and rest" },
];

// 상세 정보 (예시용)
const medicalDetail = [
  { title: "Date of visit", value: "2024.11.24" },
  { title: "Visiting Hospital", value: "Hanyang Hospital" },
  { title: "Medical Subjects", value: "sgdggsdgfg" },
  { title: "Symptoms", value: "sgdfgsdgfg" },
  { title: "Treatment Summary", value: "Hanyang Hospital" },
];

export {
  hospitals,
  initialMedicalFormData,
  medicalData,
  medicalDetail,
};
