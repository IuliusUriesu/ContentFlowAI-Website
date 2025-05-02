import { ZodType } from "zod";
import { ApiClient } from "../lib/ApiClient";
import { ApiError, ContentFlowAiApiError } from "../utils/utils";
import { CreateContentRequestInput } from "../model/api/CreateContentRequestInput";
import { GetAllGeneratedContentInput } from "../model/api/GetAllGeneratedContentInput";
import { GetContentRequestInput } from "../model/api/GetContentRequestInput";
import { ContentRequest, ContentRequestSchema } from "../model/domain/ContentRequest";
import { ContentRequestList, ContentRequestListSchema } from "../model/domain/ContentRequestList";
import {
  GeneratedContentPieceList,
  GeneratedContentPieceListSchema,
} from "../model/domain/GeneratedContentPieceList";
import {
  GeneratedContentPiece,
  GeneratedContentPieceSchema,
} from "../model/domain/GeneratedContentPiece";
import { GetGeneratedContentPieceInput } from "../model/api/GetGeneratedContentPieceInput";
import { ErrorResponseSchema } from "../model/api/ErrorResponse";
import { EditGeneratedContentPieceInput } from "../model/api/EditGeneratedContentPieceInput";

export class ContentFlowAiApiService {
  constructor(private apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // GET /v1/content-requests
  async getAllContentRequests(): Promise<ContentRequest[]> {
    return this.callApi<ContentRequestList>(
      ContentRequestListSchema,
      "Failed to retrieve content requests.",
      "GET",
      "/v1/content-requests",
    );
  }

  // GET /v1/content-requests/{content-request-id}
  async getContentRequest(input: GetContentRequestInput): Promise<ContentRequest> {
    const { contentRequestId } = input;
    return this.callApi<ContentRequest>(
      ContentRequestSchema,
      "Failed to retrieve content request.",
      "GET",
      `/v1/content-requests/${contentRequestId}`,
    );
  }

  // POST /v1/content-requests
  async createContentRequest(input: CreateContentRequestInput): Promise<ContentRequest> {
    return this.callApi<ContentRequest>(
      ContentRequestSchema,
      "Failed to create content request.",
      "POST",
      "/v1/content-requests",
      input.body,
    );
  }

  // GET /v1/content-requests/{content-request-id}/generated-content
  async getAllGeneratedContent(
    input: GetAllGeneratedContentInput,
  ): Promise<GeneratedContentPiece[]> {
    const { contentRequestId } = input;
    return this.callApi<GeneratedContentPieceList>(
      GeneratedContentPieceListSchema,
      "Failed to retrieve generated content.",
      "GET",
      `/v1/content-requests/${contentRequestId}/generated-content`,
    );
  }

  // GET /v1/generated-content/{generated-content-id}
  async getGeneratedContentPiece(
    input: GetGeneratedContentPieceInput,
  ): Promise<GeneratedContentPiece> {
    const { generatedContentId } = input;
    return this.callApi<GeneratedContentPiece>(
      GeneratedContentPieceSchema,
      "Failed to retrieve content piece.",
      "GET",
      `/v1/generated-content/${generatedContentId}`,
    );
  }

  // PATCH /v1/generated-content/{generated-content-id}/content
  async editGeneratedContentPiece(
    input: EditGeneratedContentPieceInput,
  ): Promise<GeneratedContentPiece> {
    const { generatedContentId, body } = input;
    return this.callApi<GeneratedContentPiece>(
      GeneratedContentPieceSchema,
      "Failed to edit generated content piece.",
      "PATCH",
      `/v1/generated-content/${generatedContentId}/content`,
      body,
    );
  }

  private async callApi<T>(
    zodSchema: ZodType<T, any, unknown>, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultErrorMessage: string,
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    let response: unknown;
    try {
      response = await this.apiClient.call(method, path, body);
    } catch (error) {
      console.error(error);
      this.handleApiError(error as ApiError, defaultErrorMessage);
    }

    const parsedResponse = zodSchema.safeParse(response);
    if (parsedResponse.success) {
      return parsedResponse.data;
    } else {
      throw new ContentFlowAiApiError(defaultErrorMessage);
    }
  }

  private handleApiError(apiError: ApiError, defaultErrorMessage: string) {
    if (!apiError.body) {
      throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    const parsedErrorBody = ErrorResponseSchema.safeParse(apiError.body);
    if (parsedErrorBody.success) {
      throw new ContentFlowAiApiError(parsedErrorBody.data.errorMessage);
    } else {
      throw new ContentFlowAiApiError(defaultErrorMessage);
    }
  }
}
