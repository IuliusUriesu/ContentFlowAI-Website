import { z } from "zod";
import { ContentRequestSchema } from "./ContentRequest";

export const ContentRequestListSchema = z.array(ContentRequestSchema);

export type ContentRequestList = z.infer<typeof ContentRequestListSchema>;
