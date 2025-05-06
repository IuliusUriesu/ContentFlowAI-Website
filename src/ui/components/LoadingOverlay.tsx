import SpinningLoader from "./SpinningLoader";

interface LoadingOverlayProps {
  message: string;
}

export default function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center pointer-events-auto">
      <div className="w-1/4 flex flex-col gap-4">
        <span className="text-xl text-center">{message}</span>
        <SpinningLoader />
      </div>
    </div>
  );
}
