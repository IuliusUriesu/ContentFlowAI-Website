import { useCallback, useState } from "react";
import { useCognitoAuth } from "./useCognitoAuth";
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

export const useCreateContentRequest =
  (): UseCreateContentRequestReturnType => {
    const auth = useCognitoAuth();
    const { apiService } = useServices();
    const { mutate } = useSWRConfig();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(
      async (input: CreateContentRequestInput) => {
        let errorMessage: string | undefined;
        if (!auth.isAuthenticated) {
          errorMessage = "Sign in to start creating content.";
        }

        if (errorMessage) {
          setIsLoading(false);
          setError(errorMessage);
          throw new Error(errorMessage);
        }

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
      [auth.isAuthenticated, apiService, mutate]
    );

    return {
      create,
      isLoading,
      error,
    };
  };
