import { z } from "zod";
import { ContentRequestResponseSchema } from "./ContentRequestResponse";

export const CreateContentRequestResponseSchema = ContentRequestResponseSchema;

export type CreateContentRequestResponse = z.infer<
  typeof CreateContentRequestResponseSchema
>;
