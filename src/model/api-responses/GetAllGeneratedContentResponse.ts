import { z } from "zod";
import { GeneratedContentPieceResponseSchema } from "./GeneratedContentPieceResponse";

export const GetAllGeneratedContentResponseSchema = z.array(
  GeneratedContentPieceResponseSchema
);

export type GetAllGeneratedContentResponse = z.infer<
  typeof GetAllGeneratedContentResponseSchema
>;
