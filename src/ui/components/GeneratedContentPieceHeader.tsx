import { GeneratedContentPiece } from "../../model/domain/GeneratedContentPiece";
import ContentFormatPill from "./ContentFormatPill";

interface GeneratedContentPieceHeaderProps {
  generatedContentPiece: GeneratedContentPiece;
}

export default function GeneratedContentPieceHeader({
  generatedContentPiece,
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
      {/* <div className="flex justify-end space-x-2 -mt-2 -mb-4">
        <Info size={20} />
        <Star size={20} />
        <Trash2 size={20} />
      </div> */}
    </div>
  );
}
