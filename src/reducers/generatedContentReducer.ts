import { GeneratedContentPiece } from "../model/app/GeneratedContentPiece";

export interface GeneratedContentState {
  generatedContent: GeneratedContentPiece[];
  loading: boolean;
  error: string | null;
}

export const generatedContentInitialState: GeneratedContentState = {
  generatedContent: [],
  loading: false,
  error: null,
};

export type GeneratedContentAction =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; items: GeneratedContentPiece[] }
  | { type: "FETCH_FAILURE"; error: string };

export function generatedContentReducer(
  state: GeneratedContentState,
  action: GeneratedContentAction
): GeneratedContentState {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        generatedContent: action.items,
        loading: false,
        error: null,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        generatedContent: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
