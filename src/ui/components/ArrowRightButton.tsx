import { ArrowRight } from "lucide-react";

interface ArrowRightButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function ArrowRightButton({ onClick, className = "" }: ArrowRightButtonProps) {
  return (
    <button onClick={onClick} className={`arrow-right-button ${className}`}>
      <ArrowRight size={40} />
    </button>
  );
}
