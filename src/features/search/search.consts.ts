// 진료과
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

const DEPARTMENT_NAMES_ZH = [
  "内科",
  "家庭医学科",
  "外科",
  "骨科",
  "神经外科",
  "神经内科",
  "精神健康医学科",
  "胸外科",
  "整形外科",
  "麻醉疼痛医学科",
  "妇产科",
  "儿科",
  "眼科",
  "耳鼻咽喉科",
  "皮肤科",
  "泌尿外科",
  "康复医学科",
  "口腔科",
  "急诊医学科",
] as const;

// 지역(시, 도)
const REGION_LIST = [
  { kr: "서울", en: "seoul", zh: "首尔" },
  { kr: "부산", en: "busan", zh: "釜山" },
  { kr: "대구", en: "daegu", zh: "大邱" },
  { kr: "인천", en: "incheon", zh: "仁川" },
  { kr: "광주", en: "gwangju", zh: "光州" },
  { kr: "대전", en: "daejeon", zh: "大田" },
  { kr: "울산", en: "ulsan", zh: "蔚山" },
  { kr: "세종", en: "sejong", zh: "世宗" },
  { kr: "경기", en: "gyeonggi", zh: "京畿" },
  { kr: "강원", en: "gangwon", zh: "江原" },
  { kr: "충북", en: "chungbuk", zh: "忠北" },
  { kr: "충남", en: "chungnam", zh: "忠南" },
  { kr: "전북", en: "jeonbuk", zh: "全北" },
  { kr: "전남", en: "jeonnam", zh: "全南" },
  { kr: "경북", en: "gyeongbuk", zh: "庆北" },
  { kr: "경남", en: "gyeongnam", zh: "庆南" },
  { kr: "제주", en: "jeju", zh: "济州" },
] as const;

// 언어별 이름만 따로 뽑은 배열
const REGION_NAMES_KR: string[] = REGION_LIST.map((r) => r.kr);
const REGION_NAMES_EN: string[] = REGION_LIST.map((r) => r.en);
const REGION_NAMES_ZH: string[] = REGION_LIST.map((r) => r.zh);

export {
  DEPARTMENT_NAMES_KR,
  DEPARTMENT_NAMES_EN,
  DEPARTMENT_NAMES_ZH,
  REGION_LIST,
  REGION_NAMES_EN,
  REGION_NAMES_KR,
  REGION_NAMES_ZH,
};
