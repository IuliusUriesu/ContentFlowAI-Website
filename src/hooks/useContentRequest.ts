import useSWR, { useSWRConfig } from "swr";
import { useServices } from "./useServices";
import { ContentRequest } from "../model/domain/ContentRequest";
import { GeneratedContentPiece } from "../model/domain/GeneratedContentPiece";

type UseContentRequestReturnType = {
  contentRequest?: ContentRequest;
  generatedContent: GeneratedContentPiece[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

export const useContentRequest = (id: string): UseContentRequestReturnType => {
  const { apiService } = useServices();
  const { mutate } = useSWRConfig();

  const contentRequestKey = ["content-requests", id];
  const {
    data: contentRequest,
    isLoading: isLoadingContentRequest,
    error: errorContentRequest,
  } = useSWR(
    id.length > 0 ? contentRequestKey : null,
    () => apiService.getContentRequest({ contentRequestId: id }),
    { dedupingInterval: 5000 }
  );

  const generatedContentKey = ["content-requests", id, "generated-content"];
  const {
    data: generatedContent,
    isLoading: isLoadingGeneratedContent,
    error: errorGeneratedContent,
  } = useSWR(
    id.length > 0 ? generatedContentKey : null,
    () => apiService.getAllGeneratedContent({ contentRequestId: id }),
    { dedupingInterval: 5000 }
  );

  const error = errorContentRequest ?? errorGeneratedContent ?? null;

  return {
    contentRequest,
    generatedContent: generatedContent ?? [],
    isLoading: isLoadingContentRequest || isLoadingGeneratedContent,
    error: error ? (error as Error).message : null,
    retry: () => {
      mutate(contentRequestKey);
      mutate(generatedContentKey);
    },
  };
};
