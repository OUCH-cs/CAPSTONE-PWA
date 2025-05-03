import { isAuthAtom } from "@/features/sign-in/services/atoms/auth.atoms";
import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

function AuthGuard() {
  const [isAuth] = useAtom(isAuthAtom);

  if (isAuth === null) return null;

  return <>{isAuth ? <Outlet /> : <Navigate to="/sign-in" replace />}</>;
}
export { AuthGuard };
