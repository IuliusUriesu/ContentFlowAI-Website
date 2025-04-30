import { z } from "zod";
import { ContentRequestSchema } from "../domain/ContentRequest";

export const GetContentRequestResponseSchema = ContentRequestSchema;

export type GetContentRequestResponse = z.infer<typeof GetContentRequestResponseSchema>;
