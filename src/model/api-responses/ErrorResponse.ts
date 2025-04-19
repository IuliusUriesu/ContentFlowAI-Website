import { z } from "zod";

export const ErrorResponseSchema = z.object({
  errorMessage: z.string(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
