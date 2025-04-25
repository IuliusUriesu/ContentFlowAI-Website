export interface GeneratedContentPiece {
  id: string;
  format: string;
  idea: string;
  content: string;
  initialLlmContent: string;
  markedAsPosted: boolean;
}
