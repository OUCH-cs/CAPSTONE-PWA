import { Route, Routes } from "react-router-dom";
import {
  MainPage,
  Mypage,
  RecordsPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  TranslatePage,
  SelfDiagnosisPage,
  SignupSuccessPage,
  NotFoundPage,
  MapPage,
  GuidePage,
  TranslateFinishPage,
  RecommendPage,
  CommingSoonPage
} from "@/pages";
import MedicalRecordList from "@/pages/records/medicalrecord-list";
import MedicalRecord from "@/pages/records/medicalrecord";
import MedicalRecordEdit from "@/pages/records/medicalrecord-edit";
import HealthStatus from "@/pages/records/healthstatus";
import MedicalRecordAdd from "@/pages/records/medicalrecord-add";
import HealthStatusEdit from "@/pages/records/healthstatus-edit";
import DiagnosisList from "@/pages/records/self-diagnosis-list";
import Diagnosis from "@/pages/records/self-diagnosis";
import { RedirectIfAuth, TabBarLayout } from "@/app/providers";
import SearchDetailPage from "@/pages/search/search-detail";
import EditProfile from "@/pages/mypage/edit-profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 회원가입, 로그인 */}
      <Route element={<RedirectIfAuth />}>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-up/success" element={<SignupSuccessPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Route>

      <Route element={<TabBarLayout />}>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage />} />

        {/* 검색 페이지 */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:id" element={<SearchDetailPage />} />

        {/* 기록 페이지 */}
        <Route path="/records" element={<RecordsPage />} />
        <Route
          path="/records/medicalrecord-list"
          element={<MedicalRecordList />}
        />
        <Route path="/records/medicalrecord/:id" element={<MedicalRecord />} />
        <Route
          path="/records/medicalrecord-edit/:id"
          element={<MedicalRecordEdit />}
        />
        <Route path="/records/healthstatus" element={<HealthStatus />} />
        <Route
          path="/records/medicalrecord-add"
          element={<MedicalRecordAdd />}
        />
        <Route
          path="/records/healthstatus-edit"
          element={<HealthStatusEdit />}
        />
        <Route
          path="/records/self-diagnosis-list"
          element={<DiagnosisList />}
        />

        {/* 지도 페이지 */}
        <Route path="/map" element={<MapPage />} />

        {/* 통역 페이지 */}
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/translate/finish" element={<TranslateFinishPage />} />

        {/* 마이 페이지 */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit-profile" element={<EditProfile />} />
      </Route>

      {/* 자가진단 페이지 */}
      <Route path="/self-diagnosis" element={<SelfDiagnosisPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/records/self-diagnosis/:id" element={<Diagnosis />} />

      <Route path="guide" element={<GuidePage />} />
      <Route path="/commingsoon" element={<CommingSoonPage/>} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
