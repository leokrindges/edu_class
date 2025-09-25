const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { retry?: boolean } = {}
): Promise<Response> {
  const { retry = true, headers, ...rest } = init;
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    ...rest,
  });

  if (res.status === 401 && retry) {
    const ok = await tryRefresh();
    if (ok) {
      return apiFetch(path, { ...init, retry: false });
    }
  }

  return res;
}

export async function postJson<T>(path: string, body: unknown) {
  return apiFetch<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
