import { useParams } from "react-router";
import NavigateToCreate from "../components/NavigateToCreate";
import ContentRequestInfoCard from "../components/ContentRequestInfoCard";
import ErrorWithRetry from "../components/ErrorWithRetry";
import SpinningLoader from "../components/SpinningLoader";
import GeneratedContentGrid from "../components/GeneratedContentGrid";
import { useContentRequest } from "../../hooks/useContentRequest";
import { config } from "../../config/config";

export default function ContentRequestPage() {
  const { id } = useParams();
  const { contentRequest, generatedContent, isLoading, error, retry } = useContentRequest(id ?? "");

  if (!id) {
    return <NavigateToCreate />;
  }

  const title = contentRequest?.conciseIdeaContext ?? config.appTitle;

  return (
    <div className="w-full space-y-8">
      <title>{title}</title>
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {isLoading ? (
          <SpinningLoader />
        ) : error ? (
          <ErrorWithRetry errorMessage={error} onRetry={retry} />
        ) : (
          contentRequest && (
            <>
              <ContentRequestInfoCard contentRequest={contentRequest} />
              <hr className="border-[var(--color-border-light)]" />

              {!contentRequest.isRequestProcessed ? (
                <div className="centered-container">
                  <span className="text-[var(--color-info)]">
                    We're crafting your content. It'll be worth the wait — check back in a few
                    minutes!
                  </span>
                </div>
              ) : (
                <GeneratedContentGrid generatedContent={generatedContent} />
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
