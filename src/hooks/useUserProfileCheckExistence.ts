import useSWR, { useSWRConfig } from "swr";
import { useServices } from "./useServices";

type UseUserProfileCheckExistenceReturnType = {
  profileExists: boolean;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

const swrKey = "profile";

export const useUserProfileCheckExistence = (): UseUserProfileCheckExistenceReturnType => {
  const { apiService } = useServices();
  const { mutate } = useSWRConfig();

  const { data, isLoading, error } = useSWR(swrKey, () => apiService.getUserProfile(), {
    revalidateIfStale: false,
  });

  return {
    profileExists: data ? true : false,
    isLoading,
    error: error ? (error as Error).message : null,
    retry: () => mutate(swrKey),
  };
};
