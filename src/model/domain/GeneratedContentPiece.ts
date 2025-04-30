import { z } from "zod";

export const GeneratedContentPieceSchema = z.object({
  id: z.string(),
  format: z.string(),
  idea: z.string(),
  content: z.string(),
  initialLlmContent: z.string(),
  markedAsPosted: z.boolean(),
  userId: z.string(),
});

export type GeneratedContentPiece = z.infer<typeof GeneratedContentPieceSchema>;
