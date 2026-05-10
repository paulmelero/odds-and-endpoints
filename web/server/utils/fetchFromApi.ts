import type { H3Event } from 'h3';
import { env } from 'cloudflare:workers';

const API_DEV_URL = 'http://localhost:3001';

function forwardHeaders(from: Headers, to: H3Event) {
  const link = from.get('Link');
  if (link) setResponseHeader(to, 'Link', link);
}

export async function fetchFromApi<T>(event: H3Event, path: string): Promise<T> {
  if (import.meta.dev) {
    const response = await $fetch.raw<T>(path, { baseURL: API_DEV_URL });
    forwardHeaders(response.headers, event);
    return response._data as T;
  }

  const response = await env.API.fetch(`https://api${path}`);
  forwardHeaders(response.headers, event);
  return response.json() as T;
}
