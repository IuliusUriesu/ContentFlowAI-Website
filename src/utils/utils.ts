export function getEnvVariable(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new DevelopmentError(`Environment variable ${key} is not set.`);
  }
  return value;
}

export class DevelopmentError extends Error {}

export class ApiError extends Error {
  public readonly status?: number;
  public readonly body?: unknown;

  constructor(message?: string, status?: number, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ContentFlowAiApiError extends Error {}
