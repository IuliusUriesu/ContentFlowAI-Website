import { z } from "zod";
import { ContentRequestSchema } from "../domain/ContentRequest";

export const CreateContentRequestResponseSchema = ContentRequestSchema;

export type CreateContentRequestResponse = z.infer<
  typeof CreateContentRequestResponseSchema
>;
