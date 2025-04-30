import { useState } from "react";
import ChatBoxDropdown from "./ChatBoxDropdown";
import { Loader, Send } from "lucide-react";
import { useCreateContentRequest } from "../../hooks/useCreateContentRequest";

const defaultContentFormat = "Content format";
const defaultContentPiecesCount = "How many?";

const contentFormatOptions = [
  "LinkedIn Post",
  "X (Twitter) Tweet",
  "Instagram Thread",
];

const contentPiecesCountOptions = ["3", "5", "10", "15"];

export default function ChatBox() {
  const [idea, setIdea] = useState("");
  const [contentFormat, setContentFormat] = useState(defaultContentFormat);
  const [contentPiecesCount, setContentPiecesCount] = useState(
    defaultContentPiecesCount
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const { isLoading, error, create } = useCreateContentRequest();

  const resetFields = () => {
    setIdea("");
    setContentFormat(defaultContentFormat);
    setContentPiecesCount(defaultContentPiecesCount);
  };

  const handleSend = async () => {
    setValidationError(null);

    if (idea.trim().length === 0) {
      setValidationError(
        "An idea (even a short one) is required to create content."
      );
      return;
    }

    if (contentFormat === defaultContentFormat) {
      setValidationError("You must choose a format for the content.");
      return;
    }

    if (contentPiecesCount === defaultContentPiecesCount) {
      setValidationError("How many content pieces do you want?");
      return;
    }

    create({
      ideaContext: idea.trim(),
      contentFormat,
      contentPiecesCount: Number(contentPiecesCount),
    }).then(() => resetFields());
  };

  const displayError = validationError ?? error ?? null;

  return (
    <div className="w-full max-w-3xl rounded-2xl p-8 space-y-6">
      <h1 className="chat-box-question">
        What do you want to create content about?
      </h1>

      <div className="flex flex-col space-y-4">
        <div className="chat-box">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Type your idea here..."
            className="chat-box-textarea custom-scrollbar"
          />

          <div className="chat-box-fields-container">
            <ChatBoxDropdown
              value={contentFormat}
              onChange={(value) => setContentFormat(value)}
              options={contentFormatOptions}
              widthClassName="w-44"
            />

            <ChatBoxDropdown
              value={contentPiecesCount}
              onChange={(value) => setContentPiecesCount(value)}
              options={contentPiecesCountOptions}
              widthClassName="w-32"
            />

            {isLoading ? (
              <button
                disabled
                className="chat-box-send-button cursor-auto hover:brightness-100"
              >
                <Loader className="w-5 h-5 animate-spin" />
              </button>
            ) : (
              <button onClick={handleSend} className="chat-box-send-button">
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {displayError && (
          <p className="text-[var(--color-error)] pl-2">{displayError}</p>
        )}
      </div>
    </div>
  );
}
