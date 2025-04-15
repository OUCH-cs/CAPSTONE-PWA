import { Route, Routes } from "react-router-dom";
import {
  MainPage,
  Mypage,
  RecordsPage,
  SearchPage,
  SelfDiagnosisPage,
  SignInPage,
  SignUpPage,
  TranslatePage,
} from "@/pages";
import MedicalRecordList from "@/pages/records/medicalrecord-list"; 
import HealthStatusRecordList from "@/pages/records/healthstatus-record-list";
import MedicalRecord from "@/pages/records/medicalrecord";
import HealthStatus from "@/pages/records/healthstatus"; 
import MedicalRecordAdd from "@/pages/records/medicalrecord-add";
import HealthStatusAdd from "@/pages/records/healthstatus-add";

import NotFoundPage from "@/pages/not-found/not-found";
import TestPage from "@/pages/test/test";
import { AuthGuard } from "@/app/providers";


export default function AppRoutes() {
  return (
    <Routes>
      {/* 회원가입, 로그인 */}
      <Route element={<AuthGuard />}>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Route>

      {/* 메인 페이지 */}
      <Route path="/" element={<MainPage />} />
      {/* 자가진단 페이지 */}
      <Route path="/self-diagnosis" element={<SelfDiagnosisPage />} />

      {/* 검색 페이지 */}
      <Route path="/search" element={<SearchPage />} />

      {/* 의료 기록관리 페이지 */}
      <Route path="/records" element={<RecordsPage />} />
      <Route path="/records/medicalrecord-list" element={<MedicalRecordList />} />
      <Route path="/records/healthstatus-record-list" element={<HealthStatusRecordList />} />
      <Route path="/records/medicalrecord" element={<MedicalRecord />} />
      <Route path="/records/healthstatus" element={<HealthStatus />} />
      <Route path="/records/medicalrecord-add" element={<MedicalRecordAdd />} />
      <Route path="/records/healthstatus-add" element={<HealthStatusAdd />} />

      {/* 통역 페이지 */}
      <Route path="/translate" element={<TranslatePage />} />

      {/* 마이 페이지 */}
      <Route path="/mypage" element={<Mypage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
