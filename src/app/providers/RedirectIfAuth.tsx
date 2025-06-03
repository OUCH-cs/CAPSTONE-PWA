import { isAuthAtom } from "@/features/sign-in/services/atoms/auth.atoms";
import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

function RedirectIfAuth() {
  const isAuth = useAtomValue(isAuthAtom);

  return <>{isAuth ? <Navigate to="/" replace /> : <Outlet />}</>;
}
export { RedirectIfAuth };
