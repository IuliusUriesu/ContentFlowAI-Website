import useSWR, { useSWRConfig } from "swr";
import { GeneratedContentPiece } from "../model/domain/GeneratedContentPiece";
import { useServices } from "./useServices";
import { useCallback, useMemo } from "react";
import { EditGeneratedContentPieceInput } from "../model/api/EditGeneratedContentPieceInput";

type UseGeneratedContentPieceReturnType = {
  generatedContentPiece?: GeneratedContentPiece;
  isLoading: boolean;
  error: string | null;
  editContent: (input: EditGeneratedContentPieceInput) => void;
  retryFetch: () => void;
};

export const useGeneratedContentPiece = (id: string): UseGeneratedContentPieceReturnType => {
  const { apiService } = useServices();
  const { mutate } = useSWRConfig();

  const swrKey = useMemo(() => ["generated-content", id], [id]);

  const { data, isLoading, error } = useSWR(
    id.length > 0 ? swrKey : null,
    () => apiService.getGeneratedContentPiece({ generatedContentId: id }),
    { revalidateIfStale: false },
  );

  const editContent = useCallback(
    (input: EditGeneratedContentPieceInput) => {
      if (!data || input.body.content === data.content) return;

      apiService
        .editGeneratedContentPiece(input)
        .then((updated) => mutate(swrKey, updated, { revalidate: false }));
    },
    [apiService, data, swrKey, mutate],
  );

  return {
    generatedContentPiece: data,
    isLoading,
    error: error ? (error as Error).message : null,
    editContent,
    retryFetch: () => mutate(swrKey),
  };
};
