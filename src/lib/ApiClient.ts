import { ApiError } from "../utils/utils";

export class ApiClient {
  private authToken?: string;

  constructor(private baseUrl: string) {}

  async call(method: string, path: string, body?: unknown): Promise<unknown> {
    const url = new URL(path, this.baseUrl);

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
      throw new ApiError("Request failed.");
    }

    let responseBody: unknown;
    try {
      responseBody = await response.json();
    } catch (error) {
      console.error(error);
      throw new ApiError("Failed to parse response body.");
    }

    if (!response.ok) {
      throw new ApiError(response.statusText, response.status, responseBody);
    }

    return responseBody;
  }

  setAuthToken(token?: string) {
    this.authToken = token;
  }
}
