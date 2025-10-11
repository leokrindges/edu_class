const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpResponse<T> {
  ok: boolean;
  status: number;
  statusText: string;
  body: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

async function tryRefresh(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  refresh: boolean = true
): Promise<HttpResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let responseBody: T;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    responseBody = await res.json();
  } else {
    responseBody = {} as T;
  }

  if (res.status === 401 && refresh) {
    const ok = await tryRefresh();
    if (ok) {
      return request<T>(method, path, body, false);
    }
  }

  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    body: responseBody,
  };
}

export const http = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
