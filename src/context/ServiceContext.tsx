import React, { createContext, useEffect, useRef } from "react";
import { ContentFlowAiApiService } from "../services/ContentFlowAiApiService";
import { ApiClient } from "../lib/ApiClient";
import { config } from "../config/config";
import { useCognitoAuth } from "../hooks/useCognitoAuth";

interface IServiceContext {
  apiService: ContentFlowAiApiService;
}

export const ServiceContext = createContext<IServiceContext | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const auth = useCognitoAuth();

  const apiClientRef = useRef<ApiClient | null>(null);
  const apiServiceRef = useRef<ContentFlowAiApiService | null>(null);
  const servicesRef = useRef<IServiceContext | null>(null);

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
