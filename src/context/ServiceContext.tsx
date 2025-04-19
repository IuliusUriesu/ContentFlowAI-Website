import React, { createContext, useEffect, useRef } from "react";
import { ContentFlowAiApiService } from "../services/ContentFlowAiApiService";
import { ApiClient } from "../lib/ApiClient";
import { config } from "../config/config";
import { useCognitoAuth } from "../hooks/useCognitoAuth";

interface IServiceContext {
  apiService: ContentFlowAiApiService;
}

export const ServiceContext = createContext<IServiceContext | undefined>(
  undefined
);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const auth = useCognitoAuth();

  const apiClientRef = useRef<ApiClient | undefined>(undefined);
  const apiServiceRef = useRef<ContentFlowAiApiService | undefined>(undefined);
  const servicesRef = useRef<IServiceContext | undefined>(undefined);

  if (!servicesRef.current) {
    apiClientRef.current = new ApiClient(config.apiUrl);
    apiServiceRef.current = new ContentFlowAiApiService(apiClientRef.current);
    servicesRef.current = { apiService: apiServiceRef.current };
  }

  useEffect(() => {
    apiClientRef.current?.setAuthToken(auth.user?.id_token);
  }, [auth.user?.id_token]);

  return (
    <ServiceContext.Provider value={servicesRef.current}>
      {children}
    </ServiceContext.Provider>
  );
}
