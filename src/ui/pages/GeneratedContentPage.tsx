import { useParams } from "react-router";
import { useGeneratedContentPiece } from "../../hooks/useGeneratedContentPiece";
import GoBack from "../components/GoBack";
import SpinningLoader from "../components/SpinningLoader";
import ErrorWithRetry from "../components/ErrorWithRetry";
import GeneratedContentPieceHeader from "../components/GeneratedContentPieceHeader";
import GeneratedContentPieceEditingArea from "../components/GeneratedContentPieceEditingArea";

export default function GeneratedContentPage() {
  const { id } = useParams();
  const { generatedContentPiece, isLoading, error, retry } = useGeneratedContentPiece(id ?? "");

  return (
    <div className="flex h-full w-full items-start">
      <GoBack />

      <div className="w-full h-full">
        {isLoading ? (
          <SpinningLoader />
        ) : error || !generatedContentPiece ? (
          <ErrorWithRetry errorMessage={error ?? "Failed to load content piece."} onRetry={retry} />
        ) : (
          <div className="flex flex-col gap-8 w-full h-full mx-auto max-w-7xl px-4">
            <GeneratedContentPieceHeader generatedContentPiece={generatedContentPiece} />
            <GeneratedContentPieceEditingArea generatedContentPiece={generatedContentPiece} />
          </div>
        )}
      </div>
    </div>
  );
}
