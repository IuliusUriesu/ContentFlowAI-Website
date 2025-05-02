import { config } from "../../config/config";
import ChatBox from "../components/ChatBox";

export default function CreateContentRequestPage() {
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <title>{config.appTitle}</title>
      <ChatBox />
    </div>
  );
}
