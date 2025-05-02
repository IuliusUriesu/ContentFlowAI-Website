import { useParams } from "react-router";
import { useGeneratedContentPiece } from "../../hooks/useGeneratedContentPiece";
import GoBackTo from "../components/GoBackTo";
import SpinningLoader from "../components/SpinningLoader";
import ErrorWithRetry from "../components/ErrorWithRetry";
import GeneratedContentPieceHeader from "../components/GeneratedContentPieceHeader";
import GeneratedContentPieceEditingArea from "../components/GeneratedContentPieceEditingArea";
import { useContentRequest } from "../../hooks/useContentRequest";
import { config } from "../../config/config";

export default function GeneratedContentPage() {
  const { id } = useParams();
  const { generatedContentPiece, isLoading, error, editContent, retryFetch } =
    useGeneratedContentPiece(id ?? "");
  const { contentRequest } = useContentRequest(generatedContentPiece?.contentRequestId ?? "");

  const title = <title>{contentRequest?.conciseIdeaContext ?? config.appTitle}</title>;

  const contentRequestUrl = contentRequest ? `/cr/${contentRequest?.id}` : undefined;

  return (
    <div className="flex h-full w-full items-start">
      {title}
      <GoBackTo to={contentRequestUrl} />

      <div className="w-full h-full">
        {isLoading ? (
          <SpinningLoader />
        ) : error || !generatedContentPiece ? (
          <ErrorWithRetry
            errorMessage={error ?? "Failed to load content piece."}
            onRetry={retryFetch}
          />
        ) : (
          <div className="flex flex-col gap-8 w-full h-full mx-auto max-w-7xl px-4">
            <GeneratedContentPieceHeader generatedContentPiece={generatedContentPiece} />
            <GeneratedContentPieceEditingArea
              generatedContentPiece={generatedContentPiece}
              onSave={(content: string) =>
                editContent({ generatedContentId: generatedContentPiece.id, body: { content } })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
