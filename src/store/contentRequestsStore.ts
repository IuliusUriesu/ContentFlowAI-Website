import { ContentRequest } from "../model/app/ContentRequest";

export interface ContentRequestsState {
  items: ContentRequest[];
  loading: boolean;
  error: string | null;
}

export type ContentRequestsAction =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; items: ContentRequest[] }
  | { type: "FETCH_FAILURE"; error: string };

export const contentRequestsInitialState: ContentRequestsState = {
  items: [],
  loading: false,
  error: null,
};

export function contentRequestsReducer(
  state: ContentRequestsState,
  action: ContentRequestsAction
): ContentRequestsState {
  switch (action.type) {
    case "FETCH_INIT":
      return { items: state.items, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { items: action.items, loading: false, error: null };
    case "FETCH_FAILURE":
      return { items: [], loading: false, error: action.error };
    default:
      return state;
  }
}
