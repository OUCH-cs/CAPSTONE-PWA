import { isAuthAtom } from "@/features/sign-in/services/atoms/auth.atoms";
import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

function RedirectIfAuth() {
  const [isAuth] = useAtom(isAuthAtom);

  return <>{isAuth ? <Navigate to="/" replace /> : <Outlet />}</>;
}
export { RedirectIfAuth };
