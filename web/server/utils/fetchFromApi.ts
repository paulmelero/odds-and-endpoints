import type { H3Event } from 'h3';

const API_DEV_URL = 'http://localhost:3001';

const FORWARDED_HEADERS = ['Link', 'Cache-Control', 'CDN-Cache-Control'];

function forwardHeaders(from: Headers, to: H3Event) {
  for (const name of FORWARDED_HEADERS) {
    const value = from.get(name);
    if (value) setResponseHeader(to, name, value);
  }
}

export async function fetchFromApi<T>(event: H3Event, path: string): Promise<T> {
  if (import.meta.dev) {
    const response = await $fetch.raw<T>(path, { baseURL: API_DEV_URL });
    forwardHeaders(response.headers, event);
    return response._data as T;
  }

  const { env } = await import('cloudflare:workers');
  const response = await (env as any).API.fetch(`https://api${path}`);
  forwardHeaders(response.headers, event);
  return response.json() as T;
}
