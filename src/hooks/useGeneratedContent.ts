import { useCallback, useEffect, useReducer } from "react";
import { useServices } from "./useServices";
import {
  generatedContentInitialState,
  generatedContentReducer,
} from "../reducers/generatedContentReducer";

export const useGeneratedContent = (contentRequestId: string) => {
  const [state, dispatch] = useReducer(
    generatedContentReducer,
    generatedContentInitialState
  );

  const { apiService } = useServices();

  const fetchGeneratedContent = useCallback(() => {
    if (contentRequestId.length === 0) return;

    let ignore = false;

    dispatch({ type: "FETCH_INIT" });
    apiService
      .getAllGeneratedContent({ contentRequestId })
      .then((items) => {
        if (ignore) return;
        dispatch({ type: "FETCH_SUCCESS", items });
      })
      .catch((error) => {
        if (ignore) return;
        dispatch({ type: "FETCH_FAILURE", error: (error as Error).message });
      });

    return () => {
      ignore = true;
    };
  }, [apiService, contentRequestId]);

  useEffect(() => {
    const cleanup = fetchGeneratedContent();
    return cleanup;
  }, [fetchGeneratedContent]);

  return { state, dispatch, fetchGeneratedContent };
};
