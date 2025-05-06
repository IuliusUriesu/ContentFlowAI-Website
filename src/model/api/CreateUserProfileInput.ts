import { ExistingContentPieceForm } from "../other/ExistingContentPieceForm";

export interface CreateUserProfileInput {
  body: {
    brandDetails: {
      brandThemes: string;
      toneOfVoice: string;
      targetAudience: string;
      contentGoals: string;
    };
    existingContent: ExistingContentPieceForm[];
    anthropicApiKey: string;
  };
}
