export function getEnvVariable(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new DevelopmentError(`Environment variable ${key} is not set.`);
  }
  return value;
}

export class DevelopmentError extends Error {}
