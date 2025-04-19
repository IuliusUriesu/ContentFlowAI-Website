import { ZodType } from "zod";
import { ApiClient } from "../lib/ApiClient";
import {
  DefaultFunctionResponse,
  DefaultFunctionResponseSchema,
} from "../model/api-responses/DefaultFunctionResponse";
import { ErrorResponseSchema } from "../model/api-responses/ErrorResponse";
import {
  GetAllContentRequestsResponse,
  GetAllContentRequestsResponseSchema,
} from "../model/api-responses/GetAllContentRequestsResponse";
import { ApiError, ContentFlowAiApiError } from "../utils/utils";
import { ContentRequest } from "../model/app/ContentRequest";

export class ContentFlowAiApiService {
  constructor(private apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // GET /v1/content-requests
  async getAllContentRequests(): Promise<ContentRequest[]> {
    const response = await this.callApi<GetAllContentRequestsResponse>(
      GetAllContentRequestsResponseSchema,
      "GET",
      "/v1/content-requests"
    );

    return response.map(
      (cr): ContentRequest => ({
        id: cr.SK,
        contentFormat: cr.contentFormat,
        contentPiecesCount: cr.contentPiecesCount,
        ideaContext: cr.ideaContext,
        conciseIdeaContext: cr.conciseIdeaContext,
        isRequestProcessed: cr.isRequestProcessed,
      })
    );
  }

  // GET /v1
  helloWorld(): Promise<DefaultFunctionResponse> {
    return this.callApi<DefaultFunctionResponse>(
      DefaultFunctionResponseSchema,
      "GET",
      "/v1"
    );
  }

  private async callApi<T>(
    zodSchema: ZodType<T, any, unknown>,
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    let response: unknown;
    try {
      response = await this.apiClient.call(method, path, body);
    } catch (error) {
      console.error(error);
      this.handleApiError(error as ApiError);
    }

    const parsedResponse = zodSchema.safeParse(response);
    if (parsedResponse.success) {
      return parsedResponse.data;
    } else {
      throw new ContentFlowAiApiError("Failed to parse API response.");
    }
  }

  private handleApiError(apiError: ApiError) {
    if (!apiError.body) {
      throw new ContentFlowAiApiError(apiError.message);
    }

    const parsedErrorBody = ErrorResponseSchema.safeParse(apiError.body);
    if (parsedErrorBody.success) {
      throw new ContentFlowAiApiError(parsedErrorBody.data.errorMessage);
    } else {
      throw new ContentFlowAiApiError("Failed to parse API error response.");
    }
  }
}
