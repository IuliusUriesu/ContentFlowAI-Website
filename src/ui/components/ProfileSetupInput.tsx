import { useEffect } from "react";
import ArrowRightButton from "./ArrowRightButton";

interface ProfileSetupInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  onNextClick?: () => void;
  placeholder?: string;
}

export default function ProfileSetupInput({
  value,
  onChange,
  label,
  onNextClick = () => {},
  placeholder = "Type here...",
}: ProfileSetupInputProps) {
  useEffect(() => {
    const enterPressedListener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onNextClick();
      }
    };

    window.addEventListener("keydown", enterPressedListener);

    return () => window.removeEventListener("keydown", enterPressedListener);
  }, [onNextClick]);

  return (
    <div className="w-3/4 flex flex-col gap-2 m-auto">
      <label className="text-4xl font-light mb-4 text-[var(--color-text)]">{label}</label>
      <div className="flex gap-4 border-b border-b-[var(--color-text)] pb-1">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-4xl font-extralight focus:outline-none"
        />
        <ArrowRightButton onClick={onNextClick} />
      </div>
    </div>
  );
}
