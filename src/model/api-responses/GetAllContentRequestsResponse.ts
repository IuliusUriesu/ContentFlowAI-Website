import { z } from "zod";
import { ContentRequestResponseSchema } from "./ContentRequestResponse";

export const GetAllContentRequestsResponseSchema = z.array(
  ContentRequestResponseSchema
);

export type GetAllContentRequestsResponse = z.infer<
  typeof GetAllContentRequestsResponseSchema
>;
