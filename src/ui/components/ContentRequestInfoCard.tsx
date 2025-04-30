import { ContentRequest } from "../../model/domain/ContentRequest";
import ContentFormatPill from "./ContentFormatPill";

interface ContentRequestInfoCardProps {
  contentRequest: ContentRequest;
}

export default function ContentRequestInfoCard({
  contentRequest,
}: ContentRequestInfoCardProps) {
  const { ideaContext, contentFormat } = contentRequest;

  return (
    <div className="info-card">
      <div>
        <ContentFormatPill contentFormat={contentFormat} />
      </div>
      <div>
        <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase">
          Your idea
        </div>
        <div className="text-base text-[var(--color-text)]">{ideaContext}</div>
      </div>
    </div>
  );
}
