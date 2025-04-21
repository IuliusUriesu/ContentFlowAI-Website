import { createContext, useEffect, useReducer } from "react";
import {
  ContentRequestsAction,
  contentRequestsInitialState,
  contentRequestsReducer,
  ContentRequestsState,
} from "../store/contentRequestsStore";
import { useServices } from "../hooks/useServices";
import { useCognitoAuth } from "../hooks/useCognitoAuth";

type ContentRequestsStoreContextType = {
  state: ContentRequestsState;
  dispatch: React.Dispatch<ContentRequestsAction>;
  fetchContentRequests: () => void;
};

export const ContentRequestsStoreContext = createContext<
  ContentRequestsStoreContextType | undefined
>(undefined);

export function ContentRequestsStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    contentRequestsReducer,
    contentRequestsInitialState
  );

  const auth = useCognitoAuth();
  const { apiService } = useServices();

  const fetchContentRequests = () => {
    dispatch({ type: "FETCH_INIT" });
    apiService
      .getAllContentRequests()
      .then((items) => dispatch({ type: "FETCH_SUCCESS", items }))
      .catch((error) =>
        dispatch({ type: "FETCH_FAILURE", error: (error as Error).message })
      );
  };

  useEffect(() => {
    if (!auth.isAuthenticated) return;
    fetchContentRequests();
  }, [auth.isAuthenticated]);

  return (
    <ContentRequestsStoreContext.Provider
      value={{ state, dispatch, fetchContentRequests }}
    >
      {children}
    </ContentRequestsStoreContext.Provider>
  );
}
