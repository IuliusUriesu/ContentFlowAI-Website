import { z } from "zod";

export const ContentRequestResponseSchema = z.object({
  PK: z.string().startsWith("u#"),
  SK: z.string().startsWith("cr#"),
  contentFormat: z.string(),
  contentPiecesCount: z.number().min(1),
  ideaContext: z.string(),
  conciseIdeaContext: z.string(),
  isRequestProcessed: z.boolean(),
});

export type ContentRequestResponse = z.infer<
  typeof ContentRequestResponseSchema
>;
