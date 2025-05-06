import React from "react";
import { Link } from "react-router";

interface ProfileSetupStepperProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProfileSetupStepper({ currentStep, totalSteps }: ProfileSetupStepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <ol className="flex items-center max-w-3xl mx-auto">
      {steps.map((step, idx) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <React.Fragment key={step}>
            {idx !== 0 && (
              <li
                className={`flex-1 h-0.5 ${step <= currentStep ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-light)]"}`}
              />
            )}
            <li className="relative">
              <Link
                to={`/profile-setup/${step}`}
                className={`stepper-step
                  ${
                    isCompleted || isActive
                      ? "bg-[var(--color-primary)] text-white hover:ring-[var(--color-primary)]"
                      : "bg-transparent border-2 border-[var(--color-border-light)] text-[var(--color-text-muted)] hover:ring-[var(--color-text-muted)]"
                  } ${isActive ? "stepper-active-step-ring" : ""}`}
              >
                {step}
              </Link>
            </li>
          </React.Fragment>
        );
      })}
    </ol>
  );
}
