import { SWRConfiguration } from "swr";

export const swrConfig: SWRConfiguration = {
  shouldRetryOnError: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
