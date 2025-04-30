import { useAuth } from "react-oidc-context";
import { config } from "../config/config";

export const useCognitoAuth = () => {
  const auth = useAuth();

  const customSignOutRedirect = () => {
    auth.removeUser();
    const clientId = config.oidc.clientId;
    const logoutUri = config.oidc.logoutUri;
    const cognitoDomain = config.oidc.cognitoDomain;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri,
    )}`;
  };

  return {
    ...auth,
    customSignOutRedirect,
  };
};
