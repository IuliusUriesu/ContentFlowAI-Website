import { useAuth } from "react-oidc-context";
import { oidcConfig } from "../config/oidcConfig";

export const useCognitoAuth = () => {
  const auth = useAuth();

  const appSignOutRedirect = () => {
    const clientId = oidcConfig.clientId;
    const logoutUri = oidcConfig.logoutUri;
    const cognitoDomain = oidcConfig.cognitoDomain;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return {
    ...auth,
    appSignOutRedirect,
  };
};
