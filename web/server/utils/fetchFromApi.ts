import type { H3Event } from 'h3';
import { env } from 'cloudflare:workers';

const API_DEV_URL = 'http://localhost:3001';

export async function fetchFromApi<T>(event: H3Event, path: string): Promise<T> {
  if (import.meta.dev) {
    return $fetch<T>(path, { baseURL: API_DEV_URL });
  }

  const response = await env.API.fetch(`https://api${path}`);
  return response.json() as T;
}
