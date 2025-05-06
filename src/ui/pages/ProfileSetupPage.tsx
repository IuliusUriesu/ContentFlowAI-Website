import { Navigate, useNavigate, useParams } from "react-router";
import { config } from "../../config/config";
import ProfileSetupInput from "../components/ProfileSetupInput";
import ProfileSetupStepper from "../components/ProfileSetupStepper";
import { JSX, useReducer } from "react";
import {
  profileSetupFormInitialState,
  profileSetupFormReducer,
} from "../../reducers/profileSetupFormReducer";
import ProfileSetupExistingContent from "../components/ProfileSetupExistingContent";
import ProfileSetupAnthropicApiKey from "../components/ProfileSetupAnthropicApiKey";
import ErrorBanner from "../components/ErrorBanner";
import { ValidationError } from "../../utils/utils";
import { ExistingContentPieceForm } from "../../model/other/ExistingContentPieceForm";
import { LogOut } from "lucide-react";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";
import LoadingOverlay from "../components/LoadingOverlay";
import { useCreateUserProfile } from "../../hooks/useCreateUserProfile";
import { usePollForBrandSummary } from "../../hooks/usePollForBrandSummary";
import NavigateToCreate from "../components/NavigateToCreate";

const totalSteps = 6;

export default function ProfileSetupPage() {
  const { step } = useParams();
  const currentStep = Number(step);
  const navigate = useNavigate();
  const auth = useCognitoAuth();

  const [formState, dispatch] = useReducer(profileSetupFormReducer, profileSetupFormInitialState);
  const {
    brandThemes,
    toneOfVoice,
    targetAudience,
    contentGoals,
    existingContent,
    activeIndex,
    anthropicApiKey,
  } = formState;

  const { create, isLoading, error: createError, success, clearError } = useCreateUserProfile();
  const { brandSummaryExists } = usePollForBrandSummary(success);

  if (brandSummaryExists) {
    return <NavigateToCreate />;
  }

  if (
    isNaN(currentStep) ||
    currentStep < 1 ||
    currentStep > totalSteps ||
    currentStep !== Math.floor(currentStep)
  ) {
    return <Navigate to="/profile-setup/1" replace />;
  }

  const navigateToNextStep = () => navigate(`/profile-setup/${currentStep + 1}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateAndNavigate = (obj: any, validate: (obj: any) => void) => {
    try {
      validate(obj);
      navigateToNextStep();
      if (formState.error) dispatch({ type: "SET_ERROR", error: null });
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: (error as Error).message });
    }
  };

  const stepMap: Record<number, JSX.Element> = {
    1: (
      <ProfileSetupInput
        value={brandThemes}
        onChange={(value) => dispatch({ type: "SET_BRAND_THEMES", brandThemes: value })}
        label="What is your brand about?"
        onNextClick={() => validateAndNavigate(brandThemes, validateBrandThemes)}
        placeholder="Software engineering, AI, Self development..."
      />
    ),

    2: (
      <ProfileSetupInput
        value={toneOfVoice}
        onChange={(value) => dispatch({ type: "SET_TONE_OF_VOICE", toneOfVoice: value })}
        label="What is your brand voice?"
        onNextClick={() => validateAndNavigate(toneOfVoice, validateToneOfVoice)}
        placeholder="Direct, Empowering, Casual..."
      />
    ),

    3: (
      <ProfileSetupInput
        value={targetAudience}
        onChange={(value) => dispatch({ type: "SET_TARGET_AUDIENCE", targetAudience: value })}
        label="Who is your target audience?"
        onNextClick={() => validateAndNavigate(targetAudience, validateTargetAudience)}
        placeholder="Tech enthusiasts, Growth-oriented people..."
      />
    ),

    4: (
      <ProfileSetupInput
        value={contentGoals}
        onChange={(value) => dispatch({ type: "SET_CONTENT_GOALS", contentGoals: value })}
        label="Why are you creating content?"
        onNextClick={() => validateAndNavigate(contentGoals, validateContentGoals)}
        placeholder="To educate, inspire, build trust..."
      />
    ),

    5: (
      <ProfileSetupExistingContent
        existingContent={existingContent}
        activeIndex={activeIndex}
        onSelectionChange={(index) => dispatch({ type: "SET_ACTIVE_INDEX", activeIndex: index })}
        onAdd={() => dispatch({ type: "CREATE_CONTENT_PIECE" })}
        onFormatChange={(format) =>
          dispatch({ type: "UPDATE_ACTIVE_CONTENT_PIECE_FORMAT", format })
        }
        onContentChange={(content) => {
          dispatch({ type: "UPDATE_ACTIVE_CONTENT_PIECE_CONTENT", content });
        }}
        onDelete={(index) => dispatch({ type: "DELETE_CONTENT_PIECE", index })}
        onNextClick={() => validateAndNavigate(existingContent, validateExistingContent)}
      />
    ),

    6: (
      <ProfileSetupAnthropicApiKey
        value={anthropicApiKey}
        onChange={(value) => dispatch({ type: "SET_ANTHROPIC_API_KEY", apiKey: value })}
        onNextClick={() => {
          try {
            validateAnthropicApiKey(anthropicApiKey);
            validateBrandThemes(brandThemes);
            validateToneOfVoice(toneOfVoice);
            validateTargetAudience(targetAudience);
            validateContentGoals(contentGoals);
            validateExistingContent(existingContent);
            if (formState.error) dispatch({ type: "SET_ERROR", error: null });

            create({
              body: {
                brandDetails: { brandThemes, toneOfVoice, targetAudience, contentGoals },
                existingContent,
                anthropicApiKey,
              },
            });
          } catch (error) {
            dispatch({ type: "SET_ERROR", error: (error as Error).message });
          }
        }}
      />
    ),
  };

  const currentStepJsx = stepMap[currentStep] ?? null;

  const loadingOverlay = (
    <LoadingOverlay
      message={
        "We are analyzing your profile. It may take a few minutes. Please do not close this page."
      }
    />
  );

  return (
    <div className="min-h-full flex flex-col">
      <title>{config.appTitle}</title>

      {formState.error ? (
        <ErrorBanner
          message={formState.error}
          onClose={() => dispatch({ type: "SET_ERROR", error: null })}
        />
      ) : isLoading ? (
        loadingOverlay
      ) : createError ? (
        <ErrorBanner message={createError} onClose={clearError} />
      ) : success && !brandSummaryExists ? (
        loadingOverlay
      ) : null}

      <button
        onClick={() => auth.customSignOutRedirect()}
        className="fixed top-8 right-8 cursor-pointer hover:text-[var(--color-error)] z-40"
      >
        <LogOut />
      </button>

      <div className="py-6">
        <ProfileSetupStepper currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div className="flex-1 flex min-h-0">{currentStepJsx}</div>
    </div>
  );
}

const validateBrandThemes = (brandThemes: string) => {
  if (brandThemes.length === 0) throw new ValidationError("Your brand's 'about' cannot be empty.");
};

const validateToneOfVoice = (toneOfVoice: string) => {
  if (toneOfVoice.length === 0) throw new ValidationError("Your brand's voice cannot be empty.");
};

const validateTargetAudience = (targetAudience: string) => {
  if (targetAudience.length === 0)
    throw new ValidationError("Your target audience cannot be empty.");
};

const validateContentGoals = (contentGoals: string) => {
  if (contentGoals.length === 0) throw new ValidationError("Your content goals cannot be empty.");
};

const validateExistingContent = (existingContent: ExistingContentPieceForm[]) => {
  for (const piece of existingContent) {
    if (piece.format.length === 0 || piece.content.length === 0)
      throw new ValidationError(
        "You must provide at least 3 content pieces, including their format.",
      );
  }
};

const validateAnthropicApiKey = (anthropicApiKey: string) => {
  if (anthropicApiKey.length === 0) throw new ValidationError("You must provide an API key.");
  if (!anthropicApiKey.startsWith("sk-ant-api")) throw new ValidationError("Invalid API key.");
};
