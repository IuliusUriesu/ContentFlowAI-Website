import { SWRConfiguration } from "swr";
import { config } from "./config";

export const swrConfig: SWRConfiguration = {
  shouldRetryOnError: false,
  revalidateOnFocus: config.isProd ? true : false,
  revalidateOnReconnect: true,
};
