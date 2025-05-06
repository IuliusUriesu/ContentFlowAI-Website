import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useLocation, Outlet } from "react-router";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";

export default function RequireAuth() {
  const auth = useCognitoAuth();
  const location = useLocation();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      const manualSignout = sessionStorage.getItem("manualSignout") === "1";
      if (manualSignout) {
        sessionStorage.removeItem("manualSignout");
      } else {
        auth.signinRedirect({ state: { from: location.pathname + location.search } });
      }
    }
  }, [auth, location.pathname, location.search]);

  if (auth.isLoading) {
    return (
      <div className="p-2">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return auth.isAuthenticated ? <Outlet /> : null;
}
