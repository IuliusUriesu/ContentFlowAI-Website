import React from "react";
import { oidcConfig } from "../config/oidcConfig";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: oidcConfig.authority,
  client_id: oidcConfig.clientId,
  redirect_uri: oidcConfig.redirectUri,
  response_type: "code",
  scope: "email openid profile",
};

export function CognitoAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
