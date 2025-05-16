import { ApiClient } from "../lib/ApiClient";
import { ApiError, ContentFlowAiApiError, parseObject } from "../utils/utils";
import { CreateContentRequestInput } from "../model/api/CreateContentRequestInput";
import { GetAllGeneratedContentInput } from "../model/api/GetAllGeneratedContentInput";
import { GetContentRequestInput } from "../model/api/GetContentRequestInput";
import { ContentRequest, ContentRequestSchema } from "../model/domain/ContentRequest";
import { ContentRequestListSchema } from "../model/domain/ContentRequestList";
import { GeneratedContentPieceListSchema } from "../model/domain/GeneratedContentPieceList";
import {
  GeneratedContentPiece,
  GeneratedContentPieceSchema,
} from "../model/domain/GeneratedContentPiece";
import { GetGeneratedContentPieceInput } from "../model/api/GetGeneratedContentPieceInput";
import { ErrorResponse, ErrorResponseSchema } from "../model/api/ErrorResponse";
import { EditGeneratedContentPieceInput } from "../model/api/EditGeneratedContentPieceInput";
import { UserProfile, UserProfileSchema } from "../model/domain/UserProfile";
import { CreateUserProfileInput } from "../model/api/CreateUserProfileInput";
import { EditGeneratedContentPieceMarkedAsPostedInput } from "../model/api/EditGeneratedContentPieceMarkedAsPostedInput";

const defaultErrorMessage = "Couldn't process the server's response. Please try again.";

export class ContentFlowAiApiService {
  constructor(private apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // GET /v1/profile
  async getUserProfile(): Promise<UserProfile | null> {
    let response: unknown;
    try {
      response = await this.apiClient.call("GET", "/v1/profile");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) return null;
        else this.handleApiError(error);
      } else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, UserProfileSchema, defaultErrorMessage);
  }

  // POST /v1/profile
  async createUserProfile(input: CreateUserProfileInput): Promise<UserProfile> {
    const { body } = input;
    let response: unknown;
    try {
      response = await this.apiClient.call("POST", "/v1/profile", body);
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, UserProfileSchema, defaultErrorMessage);
  }

  // GET /v1/content-requests
  async getAllContentRequests(): Promise<ContentRequest[]> {
    let response: unknown;
    try {
      response = await this.apiClient.call("GET", "/v1/content-requests");
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, ContentRequestListSchema, defaultErrorMessage);
  }

  // GET /v1/content-requests/{content-request-id}
  async getContentRequest(input: GetContentRequestInput): Promise<ContentRequest> {
    const { contentRequestId } = input;
    let response: unknown;
    try {
      response = await this.apiClient.call("GET", `/v1/content-requests/${contentRequestId}`);
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, ContentRequestSchema, defaultErrorMessage);
  }

  // POST /v1/content-requests
  async createContentRequest(input: CreateContentRequestInput): Promise<ContentRequest> {
    const { body } = input;
    let response: unknown;
    try {
      response = await this.apiClient.call("POST", "/v1/content-requests", body);
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, ContentRequestSchema, defaultErrorMessage);
  }

  // GET /v1/content-requests/{content-request-id}/generated-content
  async getAllGeneratedContent(
    input: GetAllGeneratedContentInput,
  ): Promise<GeneratedContentPiece[]> {
    const { contentRequestId } = input;
    let response: unknown;
    try {
      response = await this.apiClient.call(
        "GET",
        `/v1/content-requests/${contentRequestId}/generated-content`,
      );
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, GeneratedContentPieceListSchema, defaultErrorMessage);
  }

  // GET /v1/generated-content/{generated-content-id}
  async getGeneratedContentPiece(
    input: GetGeneratedContentPieceInput,
  ): Promise<GeneratedContentPiece> {
    const { generatedContentId } = input;
    let response: unknown;
    try {
      response = await this.apiClient.call("GET", `/v1/generated-content/${generatedContentId}`);
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, GeneratedContentPieceSchema, defaultErrorMessage);
  }

  // PATCH /v1/generated-content/{generated-content-id}/content
  async editGeneratedContentPiece(
    input: EditGeneratedContentPieceInput,
  ): Promise<GeneratedContentPiece> {
    const { generatedContentId, body } = input;
    let response: unknown;
    try {
      response = await this.apiClient.call(
        "PATCH",
        `/v1/generated-content/${generatedContentId}/content`,
        body,
      );
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, GeneratedContentPieceSchema, defaultErrorMessage);
  }

  // PATCH /v1/generated-content/{generated-content-id}/marked-as-posted
  async editGeneratedContentPieceMarkedAsPosted(
    input: EditGeneratedContentPieceMarkedAsPostedInput,
  ): Promise<GeneratedContentPiece> {
    const { generatedContentId, body } = input;
    let response: unknown;
    try {
      response = await this.apiClient.call(
        "PATCH",
        `/v1/generated-content/${generatedContentId}/marked-as-posted`,
        body,
      );
    } catch (error) {
      if (error instanceof ApiError) this.handleApiError(error);
      else throw new ContentFlowAiApiError(defaultErrorMessage);
    }

    return parseObject(response, GeneratedContentPieceSchema, defaultErrorMessage);
  }

  private handleApiError(apiError: ApiError) {
    if (!apiError.body) {
      throw new ContentFlowAiApiError(apiError.message);
    }

    const parsedErrorBody = parseObject<ErrorResponse>(
      apiError.body,
      ErrorResponseSchema,
      defaultErrorMessage,
    );

    throw new ContentFlowAiApiError(parsedErrorBody.errorMessage);
  }
}
