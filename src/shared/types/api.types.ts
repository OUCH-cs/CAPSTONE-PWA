type APIMethodType = "GET" | "POST" | "PATCH" | "DELETE";

interface IAPIRequestConfig {
  url: string;
  method?: APIMethodType;
  data?: unknown;
  headers?: Record<string, string>;
}

export type { IAPIRequestConfig };
