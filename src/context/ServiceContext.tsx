import { createContext } from "react";
import { ContentFlowAiApiService } from "../services/ContentFlowAiApiService";

export type ServiceContextType = {
  apiService: ContentFlowAiApiService;
};

export const ServiceContext = createContext<ServiceContextType | undefined>(
  undefined
);
