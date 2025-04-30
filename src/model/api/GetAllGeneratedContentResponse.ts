import { z } from "zod";
import { GeneratedContentPieceSchema } from "../domain/GeneratedContentPiece";

export const GetAllGeneratedContentResponseSchema = z.array(
  GeneratedContentPieceSchema
);

export type GetAllGeneratedContentResponse = z.infer<
  typeof GetAllGeneratedContentResponseSchema
>;
