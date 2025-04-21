import { useContext } from "react";
import { ContentRequestsStoreContext } from "../context/ContentRequestsStoreContext";
import { DevelopmentError } from "../utils/utils";

export const useContentRequestsStore = () => {
  const ctx = useContext(ContentRequestsStoreContext);
  if (!ctx) {
    throw new DevelopmentError("ContentRequestsStoreContext is undefined.");
  }
  return ctx;
};
