import { RefreshCw } from "lucide-react";

interface ErrorWithRetryProps {
  errorMessage: string;
  handleRetry: () => void;
}

export default function ErrorWithRetry({
  errorMessage,
  handleRetry,
}: ErrorWithRetryProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-2 px-4 text-center">
      <span className="text-[var(--color-error)]">{errorMessage}</span>
      <button onClick={handleRetry} className="retry-button" title="Retry">
        <RefreshCw className="w-6 h-6 text-[var(--color-error)]" />
      </button>
    </div>
  );
}
