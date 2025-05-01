import { ContentRequest } from "../../model/domain/ContentRequest";
import ContentFormatPill from "./ContentFormatPill";

interface ContentRequestInfoCardProps {
  contentRequest: ContentRequest;
}

export default function ContentRequestInfoCard({ contentRequest }: ContentRequestInfoCardProps) {
  const { ideaContext, contentFormat } = contentRequest;

  return (
    <div className="card-base">
      <div>
        <ContentFormatPill contentFormat={contentFormat} />
      </div>
      <div>
        <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase block">
          Your idea
        </span>
        <span className="text-sm text-[var(--color-text)] block">{ideaContext}</span>
      </div>
    </div>
  );
}
