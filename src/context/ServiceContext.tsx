import React, { createContext, useEffect, useRef } from "react";
import { ContentFlowAiApiService } from "../services/ContentFlowAiApiService";
import { ApiClient } from "../lib/ApiClient";
import { config } from "../config/config";
import { useCognitoAuth } from "../hooks/useCognitoAuth";

type ServiceContextType = {
  apiService: ContentFlowAiApiService;
};

export const ServiceContext = createContext<ServiceContextType | undefined>(
  undefined
);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const auth = useCognitoAuth();

  const apiClientRef = useRef<ApiClient | undefined>(undefined);
  const apiServiceRef = useRef<ContentFlowAiApiService | undefined>(undefined);
  const servicesRef = useRef<ServiceContextType | undefined>(undefined);

  if (!servicesRef.current) {
    apiClientRef.current = new ApiClient(config.apiUrl);
    apiServiceRef.current = new ContentFlowAiApiService(apiClientRef.current);
    servicesRef.current = { apiService: apiServiceRef.current };
  }

  useEffect(() => {
    if (!auth.user?.id_token) return;
    apiClientRef.current?.setAuthToken(auth.user?.id_token);
  }, [auth.user?.id_token]);

  return (
    <ServiceContext.Provider value={servicesRef.current}>
      {children}
    </ServiceContext.Provider>
  );
}
