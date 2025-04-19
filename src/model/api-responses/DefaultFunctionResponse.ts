import { z } from "zod";

export const DefaultFunctionResponseSchema = z.object({
  message: z.string(),
});

export type DefaultFunctionResponse = z.infer<
  typeof DefaultFunctionResponseSchema
>;
