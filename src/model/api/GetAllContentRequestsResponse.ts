import { z } from "zod";
import { ContentRequestSchema } from "../domain/ContentRequest";

export const GetAllContentRequestsResponseSchema =
  z.array(ContentRequestSchema);

export type GetAllContentRequestsResponse = z.infer<
  typeof GetAllContentRequestsResponseSchema
>;
