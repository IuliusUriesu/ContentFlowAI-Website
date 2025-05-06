interface ErrorBannerProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <span>{message}</span>
      <button onClick={onClose} className="cursor-pointer text-2xl">
        &times;
      </button>
    </div>
  );
}
