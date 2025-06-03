import { isAuthAtom } from "@/features/sign-in/services/atoms";
import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const isAuth = useAtomValue(isAuthAtom);

  return <>{isAuth ? <Outlet /> : <Navigate to="/sign-in" replace />}</>;
}
