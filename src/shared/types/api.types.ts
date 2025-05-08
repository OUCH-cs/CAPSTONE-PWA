type APIMethodType = "GET" | "POST" | "PATCH"| "PUT" | "DELETE";

interface IAPIRequestConfig {
  url: string;
  method?: APIMethodType;
  data?: unknown;
  headers?: Record<string, string>;
}

export type { IAPIRequestConfig };
