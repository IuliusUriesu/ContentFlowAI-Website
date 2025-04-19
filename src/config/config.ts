import { getEnvVariable } from "../utils/utils";

export const config = {
  apiUrl: getEnvVariable("VITE_API_URL"),
  oidc: {
    authority: getEnvVariable("VITE_OIDC_CONFIG_AUTHORITY"),
    cognitoDomain: getEnvVariable("VITE_OIDC_CONFIG_COGNITO_DOMAIN"),
    clientId: getEnvVariable("VITE_OIDC_CONFIG_CLIENT_ID"),
    redirectUri: getEnvVariable("VITE_OIDC_CONFIG_REDIRECT_URI"),
    logoutUri: getEnvVariable("VITE_OIDC_CONFIG_LOGOUT_URI"),
  },
};
