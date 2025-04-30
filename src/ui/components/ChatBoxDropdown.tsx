import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface ChatBoxDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  widthClassName?: string;
}

export default function ChatBoxDropdown({
  value,
  onChange,
  options,
  widthClassName = "",
}: ChatBoxDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left text-sm tracking-wide">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`chat-box-dropdown ${widthClassName ?? "w-48"} ${
          options.indexOf(value) === -1
            ? "text-[var(--color-text-muted)]"
            : "text-[var(--color-text)] font-semibold"
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="ml-2 h-5 w-5 text-[var(--color-text-muted)]" />
      </button>

      {isOpen && (
        <ul role="listbox" className={`chat-box-dropdown-list ${widthClassName ?? "w-48"}`}>
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`chat-box-dropdown-item ${
                value === opt ? "bg-[var(--color-primary)]" : ""
              }`}
            >
              <span>{opt}</span>
              {value === opt && <Check className="h-5 w-5 text-[var(--color-text)]" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
