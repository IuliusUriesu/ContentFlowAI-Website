import { useAuth } from "react-oidc-context";
import { config } from "../config/config";
import { useCallback, useMemo } from "react";

export const useCognitoAuth = () => {
  const auth = useAuth();

  const customSignOutRedirect = useCallback(() => {
    sessionStorage.setItem("manualSignout", "1");

    auth.removeUser();

    const clientId = config.oidc.clientId;
    const logoutUri = config.oidc.logoutUri;
    const cognitoDomain = config.oidc.cognitoDomain;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri,
    )}`;
  }, [auth]);

  return useMemo(
    () => ({
      ...auth,
      customSignOutRedirect,
    }),
    [auth, customSignOutRedirect],
  );
};
