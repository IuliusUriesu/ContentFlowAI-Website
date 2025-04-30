import React from "react";
import { AuthProvider } from "react-oidc-context";
import { config } from "../config/config";

const cognitoAuthConfig = {
  authority: config.oidc.authority,
  client_id: config.oidc.clientId,
  redirect_uri: config.oidc.redirectUri,
  response_type: "code",
  scope: "email openid profile",
};

export default function CognitoAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
