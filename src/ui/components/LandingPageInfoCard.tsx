interface LandingPageInfoCardProps {
  step: number;
  text: string;
}

export default function LandingPageInfoCard({ step, text }: LandingPageInfoCardProps) {
  return (
    <div className="card-base landing-page-info-card">
      <div className="text-4xl font-bold text-[var(--color-primary)]">{step}</div>
      <h3 className="mt-4 text-xl">{text}</h3>
    </div>
  );
}
