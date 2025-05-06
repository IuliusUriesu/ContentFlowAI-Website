import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { config } from "../../config/config";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";

export default function SigninCallback() {
  const auth = useCognitoAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      const fromAny = (auth.user?.state as any)?.from; // eslint-disable-line @typescript-eslint/no-explicit-any
      const from =
        fromAny && typeof fromAny === "string" && !fromAny.startsWith("/signin-callback")
          ? fromAny
          : "/create";
      navigate(from, { replace: true });
    }
  }, [auth, navigate]);

  return (
    <div className="p-2">
      <title>{config.appTitle}</title>
      <Loader className="animate-spin" />
    </div>
  );
}
