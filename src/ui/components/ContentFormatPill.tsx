interface ContentFormatPillProps {
  contentFormat: string;
}

const contentFormatStyleMap: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "LinkedIn Post": {
    bg: "bg-[#0A66C2]/20",
    text: "text-[#0A66C2]",
    border: "border-[#0A66C2]",
  },
  "X (Twitter) Tweet": {
    bg: "bg-[#1DA1F2]/20",
    text: "text-[#1DA1F2]",
    border: "border-[#1DA1F2]",
  },
  "Instagram Thread": {
    bg: "bg-[#E1306C]/20",
    text: "text-[#E1306C]",
    border: "border-[#E1306C]",
  },
};

export default function ContentFormatPill({
  contentFormat,
}: ContentFormatPillProps) {
  const contentFormatStyle = contentFormatStyleMap[contentFormat] || {
    bg: "bg-[var(--color-surface)]",
    text: "text-[var(--color-text)]",
    border: "border-[var(--color-border-text)]",
  };

  return (
    <span
      className={`inline-block px-4 py-1 rounded-full font-semibold text-sm border ${contentFormatStyle.bg} ${contentFormatStyle.text} ${contentFormatStyle.border}`}
    >
      {contentFormat}
    </span>
  );
}
