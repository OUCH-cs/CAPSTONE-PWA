import { Route, Routes } from "react-router-dom";
import {
  MainPage,
  Mypage,
  RecordsPage,
  SearchPage,
  DiagnosisFaqPage,
  SignInPage,
  SignUpPage,
  TranslatePage,
  SelfDiagnosisPage,
  SignupSuccessPage,
  NotFoundPage,
  MapPage,
  TranslateGuidePage,
} from "@/pages";

import MedicalRecordList from "@/pages/records/medicalrecord-list";
import HealthStatusRecordList from "@/pages/records/healthstatus-record-list";
import MedicalRecord from "@/pages/records/medicalrecord";
import HealthStatus from "@/pages/records/healthstatus";
import MedicalRecordAdd from "@/pages/records/medicalrecord-add";
import HealthStatusAdd from "@/pages/records/healthstatus-add";
import { AuthGuard, RedirectIfAuth } from "@/app/providers";
import TestPage from "@/pages/test/test";
import SearchDetailPage from "@/pages/search/search-detail";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 회원가입, 로그인 */}
      <Route element={<RedirectIfAuth />}>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-up/success" element={<SignupSuccessPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Route>

      <Route element={<AuthGuard />}>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage />} />

        {/* 자가진단 FAQ 페이지 */}
        <Route path="/self-diagnosisFAQ" element={<DiagnosisFaqPage />} />

        {/* 자가진단 페이지 */}
        <Route path="/self-diagnosis" element={<SelfDiagnosisPage />} />

        {/* 검색 페이지 */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:id" element={<SearchDetailPage />} />

        {/* 지도 페이지 */}
        <Route path="/map" element={<MapPage />} />

        <Route path="/records" element={<RecordsPage />} />
        <Route
          path="/records/medicalrecord-list"
          element={<MedicalRecordList />}
        />
        <Route
          path="/records/healthstatus-record-list"
          element={<HealthStatusRecordList />}
        />
        <Route path="/records/medicalrecord" element={<MedicalRecord />} />
        <Route path="/records/healthstatus" element={<HealthStatus />} />
        <Route
          path="/records/medicalrecord-add"
          element={<MedicalRecordAdd />}
        />
        <Route path="/records/healthstatus-add" element={<HealthStatusAdd />} />

        {/* 통역 페이지 */}
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/translate/guide" element={<TranslateGuidePage />} />

        {/* 마이 페이지 */}
        <Route path="/mypage" element={<Mypage />} />

        {/* 테스트 페이지 */}
        <Route path="/test" element={<TestPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
