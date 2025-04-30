import { ZodType } from "zod";
import { ApiClient } from "../lib/ApiClient";
import { ApiError, ContentFlowAiApiError } from "../utils/utils";
import { CreateContentRequestInput } from "../model/api/CreateContentRequestInput";
import { GetAllGeneratedContentInput } from "../model/api/GetAllGeneratedContentInput";
import { GetContentRequestInput } from "../model/api/GetContentRequestInput";
import { ContentRequest } from "../model/domain/ContentRequest";
import {
  GetAllContentRequestsResponse,
  GetAllContentRequestsResponseSchema,
} from "../model/api/GetAllContentRequestsResponse";
import { ErrorResponseSchema } from "../model/api/ErrorResponse";
import {
  GetContentRequestResponse,
  GetContentRequestResponseSchema,
} from "../model/api/GetContentRequestResponse";
import {
  CreateContentRequestResponse,
  CreateContentRequestResponseSchema,
} from "../model/api/CreateContentRequestResponse";
import { GeneratedContentPiece } from "../model/domain/GeneratedContentPiece";
import {
  GetAllGeneratedContentResponse,
  GetAllGeneratedContentResponseSchema,
} from "../model/api/GetAllGeneratedContentResponse";

export class ContentFlowAiApiService {
  constructor(private apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // GET /v1/content-requests
  async getAllContentRequests(): Promise<ContentRequest[]> {
    return this.callApi<GetAllContentRequestsResponse>(
      GetAllContentRequestsResponseSchema,
      "Failed to retrieve content requests.",
      "GET",
      "/v1/content-requests",
    );
  }

  // GET /v1/content-requests/{content-request-id}
  async getContentRequest(input: GetContentRequestInput): Promise<ContentRequest> {
    const { contentRequestId } = input;
    return this.callApi<GetContentRequestResponse>(
      GetContentRequestResponseSchema,
      "Failed to retrieve content request.",
      "GET",
      `/v1/content-requests/${contentRequestId}`,
    );
  }

  // POST /v1/content-requests
  async createContentRequest(input: CreateContentRequestInput): Promise<ContentRequest> {
    const body = input;
    return this.callApi<CreateContentRequestResponse>(
      CreateContentRequestResponseSchema,
      "Failed to create content request.",
      "POST",
      "/v1/content-requests",
      body,
    );
  }

  // GET /v1/content-requests/{content-request-id}/generated-content
  async getAllGeneratedContent(
    input: GetAllGeneratedContentInput,
  ): Promise<GeneratedContentPiece[]> {
    const { contentRequestId } = input;
    return this.callApi<GetAllGeneratedContentResponse>(
      GetAllGeneratedContentResponseSchema,
      "Failed to retrieve generated content.",
      "GET",
      `/v1/content-requests/${contentRequestId}/generated-content`,
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
