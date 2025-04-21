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

// const contentRequests: ContentRequest[] = [
//   {
//     id: "abcd-1234",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Focused work",
//     conciseIdeaContext: "Focused work",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1235",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Real world business insights",
//     conciseIdeaContext:
//       "Real world business insights from a million dollar man",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1236",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "$100M Lessons",
//     conciseIdeaContext: "$100M Lessons",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1237",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Focused work",
//     conciseIdeaContext: "Focused work",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1238",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Real world business insights",
//     conciseIdeaContext:
//       "Real world business insights from a million dollar man",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1239",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "$100M Lessons",
//     conciseIdeaContext: "$100M Lessons",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1240",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Focused work",
//     conciseIdeaContext: "Focused work",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1241",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Real world business insights",
//     conciseIdeaContext:
//       "Real world business insights from a million dollar man",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1242",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "$100M Lessons",
//     conciseIdeaContext: "$100M Lessons",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1243",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Focused work",
//     conciseIdeaContext: "Focused work",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1244",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Real world business insights",
//     conciseIdeaContext:
//       "Real world business insights from a million dollar man",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1245",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "$100M Lessons",
//     conciseIdeaContext: "$100M Lessons",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1246",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Focused work",
//     conciseIdeaContext: "Focused work",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1247",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "Real world business insights",
//     conciseIdeaContext:
//       "Real world business insights from a million dollar man",
//     isRequestProcessed: true,
//   },
//   {
//     id: "abcd-1248",
//     contentFormat: "X (formerly Twitter) tweet",
//     contentPiecesCount: 5,
//     ideaContext: "$100M Lessons",
//     conciseIdeaContext: "$100M Lessons",
//     isRequestProcessed: true,
//   },
// ];

export class ContentFlowAiApiService {
  constructor(private apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // GET /v1/content-requests
  async getAllContentRequests(): Promise<ContentRequest[]> {
    const response = await this.callApi<GetAllContentRequestsResponse>(
      GetAllContentRequestsResponseSchema,
      "Failed to retrieve content requests.",
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
      "Hello world failed.",
      "GET",
      "/v1"
    );
  }

  private async callApi<T>(
    zodSchema: ZodType<T, any, unknown>,
    defaultErrorMessage: string,
    method: string,
    path: string,
    body?: unknown
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
