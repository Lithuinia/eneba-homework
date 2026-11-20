import type {
  AuthPayload,
  CheckoutPayload,
  Filters,
  HomeData,
  Order,
  ProductDetail,
  ProductListResponse,
  ProductSummary,
  SearchResponse,
  User,
} from './types'

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'
let csrfToken: string | null = null

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function fetchCsrfToken(): Promise<string> {
  const response = await fetch(`${API_BASE}/auth/csrf`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  const text = await response.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }
  if (
    !response.ok ||
    !data ||
    typeof data !== 'object' ||
    !('csrf_token' in data) ||
    typeof data.csrf_token !== 'string'
  ) {
    throw new ApiError('Could not initialize security token', response.status || 500)
  }
  const token = data.csrf_token
  csrfToken = token
  return token
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase()
  const mutating = !['GET', 'HEAD', 'OPTIONS'].includes(method)
  const headers = new Headers(options.headers ?? {})
  headers.set('Content-Type', 'application/json')

  if (mutating) {
    const token = csrfToken ?? (await fetchCsrfToken())
    headers.set('X-CSRF-Token', token)
  }

  const perform = () =>
    fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      ...options,
      headers,
    })

  let response = await perform()
  if (mutating && response.status === 403) {
    const peek = await response.clone().text()
    if (peek.includes('CSRF')) {
      csrfToken = null
      const token = await fetchCsrfToken()
      headers.set('X-CSRF-Token', token)
      response = await perform()
    }
  }

  const text = await response.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { error: text }
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
        ? data.error
        : 'Request failed'
    throw new ApiError(message, response.status)
  }

  return data as T
}

function queryString(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  })
  const value = search.toString()
  return value ? `?${value}` : ''
}

export const api = {
  getHome: (lang: string) => request<HomeData>(`/home${queryString({ lang })}`),
  getFilters: () => request<Filters>('/filters'),
  getProducts: (params: Record<string, string | number | undefined | null>) =>
    request<ProductListResponse>(`/products${queryString(params)}`),
  getProduct: (slug: string) => request<ProductDetail>(`/products/${encodeURIComponent(slug)}`),
  search: (query: string, limit = 24) =>
    request<SearchResponse>(`/search${queryString({ q: query, limit })}`),
  getWishlist: () => request<{ products: ProductSummary[] }>('/wishlist'),
  addWishlist: (productId: number) =>
    request<{ added: boolean }>('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    }),
  removeWishlist: (productId: number) =>
    request<{ removed: boolean }>(`/wishlist/${productId}`, { method: 'DELETE' }),
  checkout: (payload: CheckoutPayload) =>
    request<{ order: Order }>('/checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getOrders: () => request<{ orders: Order[] }>('/orders'),
  getOrder: (id: number) => request<{ order: Order }>(`/orders/${id}`),
  me: async () => {
    const result = await request<{ user: User | null; csrf_token: string }>('/auth/me')
    if (result.csrf_token) {
      csrfToken = result.csrf_token
    }
    return result
  },
  login: (payload: AuthPayload) =>
    request<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  register: (payload: AuthPayload & { name: string }) =>
    request<{ user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  logout: async () => {
    const result = await request<{ ok: boolean }>('/auth/logout', { method: 'POST' })
    csrfToken = null
    return result
  },
}
