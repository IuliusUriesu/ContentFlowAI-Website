import useSWR, { useSWRConfig } from "swr";
import { GeneratedContentPiece } from "../model/domain/GeneratedContentPiece";
import { useServices } from "./useServices";
import { useCallback, useMemo } from "react";
import { EditGeneratedContentPieceInput } from "../model/api/EditGeneratedContentPieceInput";
import { EditGeneratedContentPieceMarkedAsPostedInput } from "../model/api/EditGeneratedContentPieceMarkedAsPostedInput";

type UseGeneratedContentPieceReturnType = {
  generatedContentPiece?: GeneratedContentPiece;
  isLoading: boolean;
  error: string | null;
  editContent: (input: EditGeneratedContentPieceInput) => void;
  editMarkedAsPosted: (input: EditGeneratedContentPieceMarkedAsPostedInput) => void;
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

  const editMarkedAsPosted = useCallback(
    (input: EditGeneratedContentPieceMarkedAsPostedInput) => {
      if (!data || input.body.markedAsPosted === data.markedAsPosted) return;

      const previousData = data;

      mutate(
        swrKey,
        (prev: GeneratedContentPiece | undefined) => {
          if (!prev) return prev;

          return {
            ...prev,
            markedAsPosted: !prev.markedAsPosted,
          };
        },
        { revalidate: false },
      );

      apiService
        .editGeneratedContentPieceMarkedAsPosted(input)
        .then((updated) => mutate(swrKey, updated, { revalidate: false }))
        .catch(() => mutate(swrKey, previousData, { revalidate: false }));
    },
    [apiService, data, swrKey, mutate],
  );

  return {
    generatedContentPiece: data,
    isLoading,
    error: error ? (error as Error).message : null,
    editContent,
    editMarkedAsPosted,
    retryFetch: () => mutate(swrKey),
  };
};
