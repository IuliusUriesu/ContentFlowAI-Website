import { Star } from "lucide-react";
import { GeneratedContentPiece } from "../../model/domain/GeneratedContentPiece";
import ContentFormatPill from "./ContentFormatPill";

interface GeneratedContentPieceHeaderProps {
  generatedContentPiece: GeneratedContentPiece;
  onStarClick: (markedAsPosted: boolean) => void;
}

export default function GeneratedContentPieceHeader({
  generatedContentPiece,
  onStarClick,
}: GeneratedContentPieceHeaderProps) {
  return (
    <div className="card-base">
      <div>
        <ContentFormatPill contentFormat={generatedContentPiece.format} />
      </div>
      <div>
        <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase block">
          Idea
        </span>
        <span className="text-sm text-[var(--color-text)] block">{generatedContentPiece.idea}</span>
      </div>
      <div className="flex justify-end space-x-2 -mt-2 -mb-4">
        <button
          onClick={() => onStarClick(!generatedContentPiece.markedAsPosted)}
          className={`primary-button p-2 font-bold
            ${generatedContentPiece.markedAsPosted ? "bg-warning hover:bg-transparent" : "bg-transparent hover:bg-warning"}`}
        >
          <Star size={16} />
        </button>
      </div>
    </div>
  );
}
