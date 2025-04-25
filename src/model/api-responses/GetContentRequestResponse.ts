import { z } from "zod";
import { ContentRequestResponseSchema } from "./ContentRequestResponse";

export const GetContentRequestResponseSchema = ContentRequestResponseSchema;

export type GetContentRequestResponse = z.infer<
  typeof GetContentRequestResponseSchema
>;
