import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface GoBackToProps {
  to?: string;
}

export default function GoBackTo({ to }: GoBackToProps) {
  const navigate = useNavigate();

  return (
    <button
      aria-label="Go back"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="go-back-button"
    >
      <ArrowLeft size={20} />
    </button>
  );
}
