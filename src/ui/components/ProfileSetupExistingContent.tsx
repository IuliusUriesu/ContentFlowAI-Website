import { Trash2 } from "lucide-react";
import { ExistingContentPieceForm } from "../../model/other/ExistingContentPieceForm";
import ArrowRightButton from "./ArrowRightButton";

interface ProfileSetupExistingContentProps {
  existingContent: ExistingContentPieceForm[];
  activeIndex: number;
  onSelectionChange: (index: number) => void;
  onAdd: () => void;
  onFormatChange: (format: string) => void;
  onContentChange: (content: string) => void;
  onDelete: (index: number) => void;
  onNextClick?: () => void;
}

const existingContentMinLimit = 3;
const existingContentMaxLimit = 10;

export default function ProfileSetupExistingContent({
  existingContent,
  activeIndex,
  onSelectionChange,
  onAdd,
  onFormatChange,
  onContentChange,
  onDelete,
  onNextClick = () => {},
}: ProfileSetupExistingContentProps) {
  return (
    <div className="w-full max-w-7xl mx-auto flex gap-2">
      <div className="flex-1 flex flex-col py-4 space-y-4">
        <span className="flex-none text-lg text-[var(--color-text)]">
          Paste below some text content you already have. It can be written in any format: short X
          tweets, longer LinkedIn posts, or even TikTok / Instagram reel transcriptions. The more
          content pieces you provide, the better the results.
        </span>
        <div className="flex-1 flex border-2 border-[var(--color-border-light)] rounded-xl p-2">
          <div className="flex-1">
            <ul className="existing-content-list">
              {existingContent.map((ec, idx) => (
                <li key={idx}>
                  <div
                    onClick={() => onSelectionChange(idx)}
                    className={`existing-content-list-item 
                    ${ec.format.length === 0 ? "text-[var(--color-text-muted)] italic" : ""}
                    ${activeIndex === idx ? "bg-[var(--color-surface)]" : ""}`}
                  >
                    <span className="truncate">{`${idx + 1}. ${ec.format || "Content format"}`}</span>
                    {existingContent.length > existingContentMinLimit && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(idx);
                        }}
                        className="hover:text-[var(--color-error)] cursor-pointer"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
              {existingContent.length < existingContentMaxLimit && (
                <li>
                  <button
                    onClick={onAdd}
                    className="existing-content-list-item existing-content-list-add-another"
                  >
                    + Add another
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className="flex-1 flex flex-col px-12 justify-start py-4 gap-4">
            <input
              value={existingContent[activeIndex].format}
              onChange={(e) => onFormatChange(e.target.value)}
              placeholder="Content format"
              className="profile-setup-form-input"
            />

            <textarea
              value={existingContent[activeIndex].content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Content..."
              className="profile-setup-form-input flex-1 overflow-y-auto custom-scrollbar resize-none max-h-96"
            />
          </div>
        </div>
      </div>
      <div className="flex-none flex items-center">
        <ArrowRightButton onClick={onNextClick} />
      </div>
    </div>
  );
}
