import { useNavigate } from "react-router";
import { GeneratedContentPiece } from "../../model/domain/GeneratedContentPiece";

interface GeneratedContentGridProps {
  generatedContent: GeneratedContentPiece[];
}

export default function GeneratedContentGrid({
  generatedContent,
}: GeneratedContentGridProps) {
  const navigate = useNavigate();

  return (
    <div className="col-grid-3">
      {generatedContent.map((gc) => (
        <div
          key={gc.id}
          onClick={() => {
            navigate(`/gc/${gc.id}`);
          }}
          className="generated-content-card"
        >
          <p className="text-sm text-[var(--color-text)] line-clamp-4">
            {gc.idea}
          </p>
        </div>
      ))}
    </div>
  );
}
