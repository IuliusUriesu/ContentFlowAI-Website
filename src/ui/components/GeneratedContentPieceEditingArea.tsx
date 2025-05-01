import { ArrowBigRight, ArrowBigDown, Pencil, Check } from "lucide-react";
import { GeneratedContentPiece } from "../../model/domain/GeneratedContentPiece";
import { useState } from "react";

interface GeneratedContentPieceEditingAreaProps {
  generatedContentPiece: GeneratedContentPiece;
}

export default function GeneratedContentPieceEditingArea({
  generatedContentPiece,
}: GeneratedContentPieceEditingAreaProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(generatedContentPiece.content);

  const handleSave = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
      {/** Left / read-only pane */}
      <div className="content-textarea-wrapper">
        <textarea
          value={generatedContentPiece.initialLlmContent}
          disabled
          spellCheck={false}
          className="content-textarea custom-scrollbar text-[var(--color-text-muted)]"
        />
      </div>

      {/** Arrow indicator */}
      <ArrowBigRight
        size={48}
        className="hidden lg:block text-[var(--color-text-muted)] shrink-0"
      />
      <ArrowBigDown size={48} className="lg:hidden text-[var(--color-text-muted)] shrink-0" />

      {/** Right / editable pane */}
      <div className={`content-textarea-wrapper ${isEdit ? "content-textarea-wrapper-focus" : ""}`}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!isEdit}
          spellCheck={false}
          className="content-textarea custom-scrollbar pr-8"
        />

        <button onClick={handleSave} className="primary-button absolute top-2 right-2 p-2">
          {isEdit ? <Check size={16} /> : <Pencil size={16} />}
        </button>
      </div>
    </div>
  );
}
