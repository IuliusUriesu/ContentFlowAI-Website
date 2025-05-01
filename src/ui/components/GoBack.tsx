import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <button aria-label="Go back" onClick={() => navigate(-1)} className="go-back-button">
      <ArrowLeft size={20} />
    </button>
  );
}
