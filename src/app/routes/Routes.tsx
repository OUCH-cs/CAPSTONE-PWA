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
} from "@/pages";
import NotFoundPage from "@/pages/not-found/not-found";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 회원가입, 로그인 */}
      <Route path="/auth">
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
      </Route>

      {/* 메인 페이지 */}
      <Route path="/" element={<MainPage />} />

      {/* 자가진단 FAQ 페이지 */}
      <Route path="/" element={<DiagnosisFaqPage />} />

      {/* 자가진단 페이지 */}
      <Route path="/self-diagnosis" element={<SelfDiagnosisPage/>} />

      {/* 검색 페이지 */}
      <Route path="/search" element={<SearchPage />} />

      {/* 의료 기록관리 페이지 */}
      <Route path="/records" element={<RecordsPage />} />

      {/* 통역 페이지 */}
      <Route path="/translate" element={<TranslatePage />} />

      {/* 마이 페이지 */}
      <Route path="/mypage" element={<Mypage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
