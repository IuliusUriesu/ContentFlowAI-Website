import { RefreshCw } from "lucide-react";

interface ErrorWithRetryProps {
  errorMessage: string;
  onRetry: () => void;
}

export default function ErrorWithRetry({
  errorMessage,
  onRetry,
}: ErrorWithRetryProps) {
  return (
    <div className="centered-container">
      <span className="text-[var(--color-error)]">{errorMessage}</span>
      <button onClick={onRetry} className="retry-button" title="Retry">
        <RefreshCw className="w-6 h-6 text-[var(--color-error)]" />
      </button>
    </div>
  );
}
