import { useEffect, useState } from "react";
import ChatBoxDropdown from "./ChatBoxDropdown";
import { Loader, Send } from "lucide-react";
import { useContentRequestsStore } from "../../hooks/useContentRequestsStore";
import { useServices } from "../../hooks/useServices";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";

const defaultContentFormat = "Content format";
const defaultContentPiecesCount = "How many?";

export default function ChatBox() {
  const [idea, setIdea] = useState("");
  const [contentFormat, setContentFormat] = useState(defaultContentFormat);
  const [contentPiecesCount, setContentPiecesCount] = useState(
    defaultContentPiecesCount
  );

  const { state, dispatch } = useContentRequestsStore();
  const { createLoading, createError } = state;

  const auth = useCognitoAuth();
  const { apiService } = useServices();

  useEffect(() => {
    return () => dispatch({ type: "CREATE_CLEAR_ERROR" });
  }, [dispatch]);

  const contentFormatOptions = [
    "LinkedIn Post",
    "X (Twitter) Tweet",
    "Instagram Thread",
  ];

  const contentPiecesCountOptions = ["3", "5", "10", "15"];

  const resetFields = () => {
    setIdea("");
    setContentFormat(defaultContentFormat);
    setContentPiecesCount(defaultContentPiecesCount);
  };

  const handleSend = () => {
    dispatch({ type: "CREATE_INIT" });

    if (!auth.isAuthenticated) {
      dispatch({
        type: "CREATE_FAILURE",
        error: "Sign in to start creating content.",
      });
      return;
    }

    if (idea.length === 0) {
      dispatch({
        type: "CREATE_FAILURE",
        error: "An idea (even a short one) is required to create content.",
      });
      return;
    }

    if (contentFormat === defaultContentFormat) {
      dispatch({
        type: "CREATE_FAILURE",
        error: "You must choose a format for the content.",
      });
      return;
    }

    if (contentPiecesCount === defaultContentPiecesCount) {
      dispatch({
        type: "CREATE_FAILURE",
        error: "How many content pieces do you want?",
      });
      return;
    }

    apiService
      .createContentRequest({
        ideaContext: idea,
        contentFormat,
        contentPiecesCount: +contentPiecesCount,
      })
      .then((item) => {
        dispatch({ type: "CREATE_SUCCESS", item });
        resetFields();
      })
      .catch((error) =>
        dispatch({ type: "CREATE_FAILURE", error: (error as Error).message })
      );
  };

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

            {createLoading ? (
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

        {createError && (
          <p className="text-[var(--color-error)] pl-2">{createError}</p>
        )}
      </div>
    </div>
  );
}
