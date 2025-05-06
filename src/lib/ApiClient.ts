import { ApiError } from "../utils/utils";

export class ApiClient {
  private authToken: string;
  private tokenReadyPromise: Promise<void>;
  private resolveTokenReadyPromise!: () => void;

  constructor(private baseUrl: string) {
    this.authToken = "";
    this.tokenReadyPromise = new Promise((resolve) => {
      this.resolveTokenReadyPromise = resolve;
    });
  }

  async call(method: string, path: string, body?: unknown): Promise<unknown> {
    await this.tokenReadyPromise;

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
      throw new ApiError("A network error occurred. Please check your connection and try again.");
    }

    let responseBody: unknown;
    try {
      responseBody = await response.json();
    } catch (error) {
      throw new ApiError("Unable to process the server's response. Please try again.");
    }

    if (!response.ok) {
      throw new ApiError(response.statusText, response.status, responseBody);
    }

    return responseBody;
  }

  setAuthToken(token: string) {
    this.authToken = token;
    this.resolveTokenReadyPromise();
  }
}
