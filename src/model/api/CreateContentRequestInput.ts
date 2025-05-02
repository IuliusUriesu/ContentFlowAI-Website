export interface CreateContentRequestInput {
  body: {
    ideaContext: string;
    contentFormat: string;
    contentPiecesCount: number;
  };
}
