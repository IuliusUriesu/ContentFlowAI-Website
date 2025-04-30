import useSWR, { useSWRConfig } from "swr";
import { useServices } from "./useServices";
import { useCognitoAuth } from "./useCognitoAuth";
import { ContentRequest } from "../model/domain/ContentRequest";

type UseContentRequestsReturnType = {
  contentRequests: ContentRequest[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

const swrKey = "content-requests";

export const useContentRequests = (): UseContentRequestsReturnType => {
  const auth = useCognitoAuth();
  const { apiService } = useServices();
  const { mutate } = useSWRConfig();

  const { data, isLoading, error } = useSWR(
    auth.isAuthenticated ? swrKey : null,
    () => apiService.getAllContentRequests(),
    { revalidateIfStale: false }
  );

  return {
    contentRequests: data ?? [],
    isLoading,
    error: error ? (error as Error).message : null,
    retry: () => mutate(swrKey),
  };
};
