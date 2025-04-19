import { z } from "zod";

export const GetAllContentRequestsResponseSchema = z.array(
  z.object({
    PK: z.string().startsWith("u#"),
    SK: z.string().startsWith("cr#"),
    contentFormat: z.string(),
    contentPiecesCount: z.number().min(1),
    ideaContext: z.string(),
    conciseIdeaContext: z.string(),
    isRequestProcessed: z.boolean(),
  })
);

export type GetAllContentRequestsResponse = z.infer<
  typeof GetAllContentRequestsResponseSchema
>;
