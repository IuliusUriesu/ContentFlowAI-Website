import { Loader } from "lucide-react";

export default function SpinningLoader() {
  return (
    <div className="flex-1 flex items-center justify-center py-auto">
      <Loader className="animate-spin text-[var(--color-text)]" size={32} />
    </div>
  );
}
