import { AUTH_ERROR_TYPES } from 'shared/constants/auth';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return `/api`;
  return process.env.API_URL;
};

// 진행 중인 토큰 재발급 요청. 동시에 401이 여러 개 와도 재발급은 이 Promise 하나만 사용한다.
let refreshPromise: Promise<boolean> | null = null;

const refreshOnce = () => {
  if (!refreshPromise) {
    refreshPromise = fetch('/api/refresh', { method: 'POST' })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

async function request<T>(url: string, options?: RequestInit, isRetry = false): Promise<T> {
  const baseUrl = getBaseUrl();
  const isServer = typeof window === 'undefined';

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>)
  };

  if (isServer) {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const token = cookieStore.get('accessToken')?.value;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('SSR Token injection failed:', e);
    }
  }

  if (!(options?.body instanceof FormData)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
  }

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers
  });

  // 브라우저에서 401을 받으면 토큰을 한 번만 재발급하고, 원래 요청을 한 번 다시 보낸다.
  if (res.status === 401 && !isServer && !isRetry) {
    const refreshed = await refreshOnce();
    if (refreshed) return request<T>(url, options, true);

    window.location.href = `/login?error=${AUTH_ERROR_TYPES.AUTH_EXPIRED}`;
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData;
  }

  return res.json();
}

export const http = {
  get: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  delete: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'DELETE' })
};
