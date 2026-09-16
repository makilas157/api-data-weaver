import { queryOptions } from "@tanstack/react-query";
import {
  posts as fallbackPosts,
  products as fallbackProducts,
  projects as fallbackProjects,
  services as fallbackServices,
  socials as fallbackSocials,
  stats as fallbackStats,
  type CatalogItem,
  type Post,
  type Project,
} from "@/data/site";

/**
 * Backend API client.
 *
 * Set VITE_API_BASE_URL in your environment (e.g. .env) to your backend's
 * base URL, e.g. VITE_API_BASE_URL=https://api.tevexxo.com
 *
 * Expected endpoints:
 *   GET  {base}/services            -> ApiCatalogItem[]
 *   GET  {base}/services/:slug      -> ApiCatalogItem
 *   GET  {base}/products            -> ApiCatalogItem[]
 *   GET  {base}/products/:slug      -> ApiCatalogItem
 *   GET  {base}/posts               -> ApiPost[]
 *   GET  {base}/posts/:slug         -> ApiPost
 *   GET  {base}/projects            -> ApiProject[]
 *   GET  {base}/stats               -> ApiStat[]
 *   GET  {base}/socials             -> ApiSocial[]
 *   POST {base}/contact             -> body: ContactMessage
 *
 * While VITE_API_BASE_URL is not configured, the bundled content in
 * src/data/site.ts is used so the site still renders.
 */
export const API_BASE_URL: string | undefined = import.meta.env.VITE_API_BASE_URL;

/* ---------- Request / response types ---------- */

export type ApiCatalogItem = CatalogItem;

export type ApiPost = Post;

export type ApiProject = Project;

export interface ApiStat {
  value: string;
  label: string;
}

export interface ApiSocial {
  name: string;
  handle: string;
  href: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success?: boolean;
  message?: string;
}

/* ---------- Fetch helper ---------- */

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    throw new ApiError(res.status, `API request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

/* ---------- Queries (API with bundled fallback until VITE_API_BASE_URL is set) ---------- */

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: () =>
    API_BASE_URL ? apiFetch<ApiCatalogItem[]>("/services") : Promise.resolve(fallbackServices),
});

export const serviceQuery = (slug: string) =>
  queryOptions({
    queryKey: ["services", slug],
    queryFn: async () => {
      if (!API_BASE_URL) return fallbackServices.find((s) => s.slug === slug) ?? null;
      try {
        return await apiFetch<ApiCatalogItem>(`/services/${slug}`);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null;
        throw e;
      }
    },
  });

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () =>
    API_BASE_URL ? apiFetch<ApiCatalogItem[]>("/products") : Promise.resolve(fallbackProducts),
});

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["products", slug],
    queryFn: async () => {
      if (!API_BASE_URL) return fallbackProducts.find((p) => p.slug === slug) ?? null;
      try {
        return await apiFetch<ApiCatalogItem>(`/products/${slug}`);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null;
        throw e;
      }
    },
  });

export const postsQuery = queryOptions({
  queryKey: ["posts"],
  queryFn: () => (API_BASE_URL ? apiFetch<ApiPost[]>("/posts") : Promise.resolve(fallbackPosts)),
});

export const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["posts", slug],
    queryFn: async () => {
      if (!API_BASE_URL) return fallbackPosts.find((p) => p.slug === slug) ?? null;
      try {
        return await apiFetch<ApiPost>(`/posts/${slug}`);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null;
        throw e;
      }
    },
  });

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: () =>
    API_BASE_URL ? apiFetch<ApiProject[]>("/projects") : Promise.resolve(fallbackProjects),
});

export const statsQuery = queryOptions({
  queryKey: ["stats"],
  queryFn: () => (API_BASE_URL ? apiFetch<ApiStat[]>("/stats") : Promise.resolve(fallbackStats)),
});

export const socialsQuery = queryOptions({
  queryKey: ["socials"],
  queryFn: () =>
    API_BASE_URL ? apiFetch<ApiSocial[]>("/socials") : Promise.resolve(fallbackSocials),
});

/* ---------- Mutations ---------- */

export async function submitContact(message: ContactMessage): Promise<ContactResponse> {
  if (!API_BASE_URL) {
    throw new ApiError(0, "VITE_API_BASE_URL is not configured");
  }
  return apiFetch<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(message),
  });
}
