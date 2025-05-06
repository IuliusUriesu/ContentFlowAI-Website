import { useCallback, useState } from "react";
import { useServices } from "./useServices";
import { CreateContentRequestInput } from "../model/api/CreateContentRequestInput";
import { useSWRConfig } from "swr";
import { ContentRequest } from "../model/domain/ContentRequest";

type UseCreateContentRequestReturnType = {
  create: (input: CreateContentRequestInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const swrKey = "content-requests";

export const useCreateContentRequest = (): UseCreateContentRequestReturnType => {
  const { apiService } = useServices();
  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (input: CreateContentRequestInput) => {
      setIsLoading(true);
      setError(null);

      try {
        const cr = await apiService.createContentRequest(input);
        mutate(swrKey, (prev: ContentRequest[] = []) => [cr, ...prev], {
          revalidate: false,
        });
      } catch (error) {
        setError((error as Error).message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [apiService, mutate],
  );

  return {
    create,
    isLoading,
    error,
  };
};
