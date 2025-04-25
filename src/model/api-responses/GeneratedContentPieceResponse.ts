import { z } from "zod";

export const GeneratedContentPieceResponseSchema = z.object({
  PK: z.string().startsWith("u#"),
  SK: z.string().startsWith("gc#"),
  generatedContentId: z.string().startsWith("gc#"),
  format: z.string(),
  idea: z.string(),
  content: z.string(),
  initialLlmContent: z.string(),
  markedAsPosted: z.boolean(),
});

export type GeneratedContentPieceResponse = z.infer<
  typeof GeneratedContentPieceResponseSchema
>;
