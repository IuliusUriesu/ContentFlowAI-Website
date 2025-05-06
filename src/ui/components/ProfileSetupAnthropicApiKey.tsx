import ArrowRightButton from "./ArrowRightButton";

interface ProfileSetupAnthropicApiKeyProps {
  value: string;
  onChange: (value: string) => void;
  onNextClick?: () => void;
}

export default function ProfileSetupAnthropicApiKey({
  value,
  onChange,
  onNextClick = () => {},
}: ProfileSetupAnthropicApiKeyProps) {
  const anthropicApiKeyUrl = "https://console.anthropic.com/settings/organization";

  return (
    <div className="w-full max-w-2xl mx-auto my-4 card-base">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[var(--color-text)]">
        Connect your Anthropic API Key
      </h2>
      <p className="text-[var(--color-text-muted)] leading-relaxed">
        We use Claude to create personalized content for your brand. To get started, paste your API
        key below. We'll securely store it so you never have to enter it again.
      </p>

      {/* Steps */}
      <ol className="list-decimal list-inside space-y-4 text-[var(--color-text-muted)]">
        <li>
          Go to{" "}
          <a
            href={anthropicApiKeyUrl}
            target="_blank"
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            {anthropicApiKeyUrl}
          </a>{" "}
          and sign in (or create an account).
        </li>
        <li>
          Add credit to your Anthropic account. Each time you generate content with ContentFlowAI, a
          small fee (around $0.10–$0.15) is deducted from your balance. If you notice any unexpected
          charges or have questions, please contact us right away!
        </li>
        <li>
          In the <span className="text-semibold">API keys</span> section, click{" "}
          <span className="text-semibold">+ Create Key</span>, name it (e.g. ContentFlowAI-Key),
          then click <span className="text-semibold">Add</span>.
        </li>
        <li>Copy the key and paste it below:</li>
      </ol>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="sk-ant-api..."
        type="password"
        className="profile-setup-form-input w-full py-3 bg-[var(--color-bg)] focus:border-[var(--color-primary)] transition-colors"
      />

      <div className="flex justify-center">
        <ArrowRightButton onClick={onNextClick} className="hover:bg-[var(--color-bg)]" />
      </div>
    </div>
  );
}
