import { ExistingContentPieceForm } from "../model/other/ExistingContentPieceForm";

type ProfileSetupFormState = {
  brandThemes: string;
  toneOfVoice: string;
  targetAudience: string;
  contentGoals: string;
  existingContent: ExistingContentPieceForm[];
  activeIndex: number;
  anthropicApiKey: string;
  error: string | null;
};

type ProfileSetupFormAction =
  | { type: "SET_BRAND_THEMES"; brandThemes: string }
  | { type: "SET_TONE_OF_VOICE"; toneOfVoice: string }
  | { type: "SET_TARGET_AUDIENCE"; targetAudience: string }
  | { type: "SET_CONTENT_GOALS"; contentGoals: string }
  | { type: "SET_ACTIVE_INDEX"; activeIndex: number }
  | { type: "CREATE_CONTENT_PIECE" }
  | { type: "UPDATE_ACTIVE_CONTENT_PIECE_FORMAT"; format: string }
  | { type: "UPDATE_ACTIVE_CONTENT_PIECE_CONTENT"; content: string }
  | { type: "DELETE_CONTENT_PIECE"; index: number }
  | { type: "SET_ANTHROPIC_API_KEY"; apiKey: string }
  | { type: "SET_ERROR"; error: string | null };

export const profileSetupFormInitialState: ProfileSetupFormState = {
  brandThemes: "",
  toneOfVoice: "",
  targetAudience: "",
  contentGoals: "",
  existingContent: [
    { format: "", content: "" },
    { format: "", content: "" },
    { format: "", content: "" },
  ],
  activeIndex: 0,
  anthropicApiKey: "",
  error: null,
};

export const profileSetupFormReducer = (
  state: ProfileSetupFormState,
  action: ProfileSetupFormAction,
): ProfileSetupFormState => {
  switch (action.type) {
    case "SET_BRAND_THEMES":
      return { ...state, brandThemes: action.brandThemes };
    case "SET_TONE_OF_VOICE":
      return { ...state, toneOfVoice: action.toneOfVoice };
    case "SET_TARGET_AUDIENCE":
      return { ...state, targetAudience: action.targetAudience };
    case "SET_CONTENT_GOALS":
      return { ...state, contentGoals: action.contentGoals };
    case "SET_ACTIVE_INDEX":
      return { ...state, activeIndex: action.activeIndex };
    case "CREATE_CONTENT_PIECE":
      return {
        ...state,
        existingContent: [...state.existingContent, { format: "", content: "" }],
        activeIndex: state.existingContent.length,
      };
    case "UPDATE_ACTIVE_CONTENT_PIECE_FORMAT": {
      const newExistingContent = state.existingContent.slice();
      newExistingContent[state.activeIndex].format = action.format;
      return { ...state, existingContent: newExistingContent };
    }
    case "UPDATE_ACTIVE_CONTENT_PIECE_CONTENT": {
      const newExistingContent = state.existingContent.slice();
      newExistingContent[state.activeIndex].content = action.content;
      return { ...state, existingContent: newExistingContent };
    }
    case "DELETE_CONTENT_PIECE": {
      const newExistingContent = state.existingContent.filter((_, idx) => idx !== action.index);
      let newActiveIndex =
        action.index >= state.activeIndex ? state.activeIndex : state.activeIndex - 1;
      newActiveIndex =
        newActiveIndex === state.existingContent.length - 1 ? newActiveIndex - 1 : newActiveIndex;
      return { ...state, existingContent: newExistingContent, activeIndex: newActiveIndex };
    }
    case "SET_ANTHROPIC_API_KEY":
      return { ...state, anthropicApiKey: action.apiKey };
    case "SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};
