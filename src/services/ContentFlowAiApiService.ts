import { ApiClient } from "../lib/ApiClient";
import {
  DefaultFunctionResponse,
  DefaultFunctionResponseSchema,
} from "../model/api-responses/DefaultFunctionResponse";
import { ErrorResponseSchema } from "../model/api-responses/ErrorResponse";
import { ApiError, ContentFlowAiApiError } from "../utils/utils";

export class ContentFlowAiApiService {
  constructor(private apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // GET /v1
  async helloWorld(): Promise<DefaultFunctionResponse> {
    let response: unknown;
    try {
      response = await this.apiClient.get("/v1");
    } catch (error) {
      console.error(error);
      this.handleApiError(error as ApiError);
    }

    const parsedResponse = DefaultFunctionResponseSchema.safeParse(response);
    if (parsedResponse.success) {
      return parsedResponse.data;
    } else {
      console.error(parsedResponse.error);
      throw new ContentFlowAiApiError("Failed to call the ContentFlowAI API.");
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
      console.error(parsedErrorBody.error);
      throw new ContentFlowAiApiError("An unexpected error occurred.");
    }
  }
}
