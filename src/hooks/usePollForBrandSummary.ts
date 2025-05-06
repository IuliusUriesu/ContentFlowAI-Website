import useSWR from "swr";
import { useServices } from "./useServices";

type UsePollForBrandSummaryReturnType = {
  brandSummaryExists: boolean;
};

const swrKey = "profile";

export const usePollForBrandSummary = (shouldStart: boolean): UsePollForBrandSummaryReturnType => {
  const { apiService } = useServices();

  const { data } = useSWR(swrKey, () => apiService.getUserProfile(), {
    revalidateIfStale: false,
    refreshInterval: (data) => (data?.brandSummary ? 0 : shouldStart ? 5000 : 0),
  });

  return {
    brandSummaryExists: data?.brandSummary ? true : false,
  };
};
