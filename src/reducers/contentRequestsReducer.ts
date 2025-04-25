import { ContentRequest } from "../model/app/ContentRequest";

export interface ContentRequestsState {
  contentRequests: ContentRequest[];
  fetchLoading: boolean;
  fetchError: string | null;
  createLoading: boolean;
  createError: string | null;
}

export const contentRequestsInitialState: ContentRequestsState = {
  contentRequests: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export type ContentRequestsAction =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; items: ContentRequest[] }
  | { type: "FETCH_FAILURE"; error: string }
  | { type: "CREATE_INIT" }
  | { type: "CREATE_SUCCESS"; item: ContentRequest }
  | { type: "CREATE_FAILURE"; error: string }
  | { type: "CREATE_CLEAR_ERROR" };

export function contentRequestsReducer(
  state: ContentRequestsState,
  action: ContentRequestsAction
): ContentRequestsState {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, fetchLoading: true, fetchError: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        contentRequests: action.items,
        fetchLoading: false,
        fetchError: null,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        contentRequests: [],
        fetchLoading: false,
        fetchError: action.error,
      };
    case "CREATE_INIT":
      return { ...state, createLoading: true, createError: null };
    case "CREATE_SUCCESS":
      return {
        ...state,
        contentRequests: [action.item, ...state.contentRequests],
        createLoading: false,
        createError: null,
      };
    case "CREATE_FAILURE":
      return {
        ...state,
        createLoading: false,
        createError: action.error,
      };
    case "CREATE_CLEAR_ERROR":
      return {
        ...state,
        createError: null,
      };
    default:
      return state;
  }
}
