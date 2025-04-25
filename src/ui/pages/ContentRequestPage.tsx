import { useContentRequestsStore } from "../../hooks/useContentRequestsStore";
import { useParams } from "react-router";
import NavigateToCreate from "../components/NavigateToCreate";
import ContentRequestInfoCard from "../components/ContentRequestInfoCard";
import { useMemo } from "react";
import { useGeneratedContent } from "../../hooks/useGeneratedContent";
import ErrorWithRetry from "../components/ErrorWithRetry";
import SpinningLoader from "../components/SpinningLoader";
import GeneratedContentGrid from "../components/GeneratedContentGrid";

export default function ContentRequestPage() {
  const { id } = useParams();
  const { state: contentRequestsState } = useContentRequestsStore();

  const contentRequest = useMemo(
    () =>
      contentRequestsState.contentRequests.find((cr) =>
        cr.id.endsWith(`#${id}`)
      ),
    [contentRequestsState.contentRequests, id]
  );

  const { state: generatedContentState, fetchGeneratedContent } =
    useGeneratedContent(contentRequest?.id ?? "");

  if (!id || !contentRequest) {
    return <NavigateToCreate />;
  }

  return (
    <div className="w-full space-y-8">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <ContentRequestInfoCard contentRequest={contentRequest} />
        <hr className="border-[var(--color-border-light)]" />

        {generatedContentState.loading ? (
          <SpinningLoader />
        ) : generatedContentState.error ? (
          <ErrorWithRetry
            errorMessage={generatedContentState.error}
            handleRetry={() => fetchGeneratedContent()}
          />
        ) : (
          <GeneratedContentGrid
            generatedContent={generatedContentState.generatedContent}
          />
        )}
      </div>
    </div>
  );
}
