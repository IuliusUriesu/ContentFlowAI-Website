import useSWR, { useSWRConfig } from "swr";
import { GeneratedContentPiece } from "../model/domain/GeneratedContentPiece";
import { useServices } from "./useServices";

type UseGeneratedContentPieceReturnType = {
  generatedContentPiece?: GeneratedContentPiece;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

export const useGeneratedContentPiece = (id: string): UseGeneratedContentPieceReturnType => {
  const { apiService } = useServices();
  const { mutate } = useSWRConfig();

  const swrKey = ["generated-content", id];

  const { data, isLoading, error } = useSWR(
    id.length > 0 ? swrKey : null,
    () => apiService.getGeneratedContentPiece({ generatedContentId: id }),
    { dedupingInterval: 5000 },
  );

  return {
    generatedContentPiece: data,
    isLoading,
    error: error ? (error as Error).message : null,
    retry: () => mutate(swrKey),
  };
};
