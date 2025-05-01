import { z } from "zod";
import { GeneratedContentPieceSchema } from "../domain/GeneratedContentPiece";

export const GetGeneratedContentPieceResponseSchema = GeneratedContentPieceSchema;

export type GetGeneratedContentPieceResponse = z.infer<
  typeof GetGeneratedContentPieceResponseSchema
>;
