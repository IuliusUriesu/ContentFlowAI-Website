import { CreateUserProfileInput } from "../model/api/CreateUserProfileInput";
import { useServices } from "./useServices";
import { useCallback, useState } from "react";

type UseCreateUserProfileReturnType = {
  create: (input: CreateUserProfileInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  clearError: () => void;
};

export const useCreateUserProfile = (): UseCreateUserProfileReturnType => {
  const { apiService } = useServices();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const create = useCallback(
    async (input: CreateUserProfileInput) => {
      setIsLoading(true);
      setError(null);

      try {
        await apiService.createUserProfile(input);
        setSuccess(true);
      } catch (error) {
        setError((error as Error).message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [apiService],
  );

  return {
    create,
    isLoading,
    error,
    success,
    clearError: () => setError(null),
  };
};
