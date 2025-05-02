import { z } from "zod";
import { GeneratedContentPieceSchema } from "./GeneratedContentPiece";

export const GeneratedContentPieceListSchema = z.array(GeneratedContentPieceSchema);

export type GeneratedContentPieceList = z.infer<typeof GeneratedContentPieceListSchema>;
