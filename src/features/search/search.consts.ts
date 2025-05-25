const fieldMaskMap: Record<string, string> = {
  ":searchNearby":
    "places.displayName,places.id,places.currentOpeningHours.openNow,places.currentOpeningHours.weekdayDescriptions,places.rating,places.primaryTypeDisplayName,places.types,places.location",
  ":searchText":
    "places.displayName,places.id,places.currentOpeningHours.openNow,places.currentOpeningHours.weekdayDescriptions,places.rating,places.primaryTypeDisplayName,places.types,places.location",
};

const DEPARTMENT_NAMES_KR = [
  "내과",
  "가정의학과",
  "외과",
  "정형외과",
  "신경외과",
  "신경과",
  "정신건강의학과",
  "흉부외과",
  "성형외과",
  "마취통증의학과",
  "산부인과",
  "소아청소년과",
  "안과",
  "이비인후과",
  "피부과",
  "비뇨의학과",
  "재활의학과",
  "치과",
  "응급의학과",
] as const;

const DEPARTMENT_NAMES_EN = [
  "Internal Medicine",
  "Family Medicine",
  "General Surgery",
  "Orthopedic Surgery",
  "Neurosurgery",
  "Neurology",
  "Psychiatry",
  "Thoracic Surgery",
  "Plastic Surgery",
  "Anesthesiology & Pain Medicine",
  "Obstetrics & Gynecology",
  "Pediatrics",
  "Ophthalmology",
  "Otorhinolaryngology (ENT)",
  "Dermatology",
  "Urology",
  "Rehabilitation Medicine",
  "Dentistry",
  "Emergency Medicine",
] as const;

export { fieldMaskMap, DEPARTMENT_NAMES_KR, DEPARTMENT_NAMES_EN };
