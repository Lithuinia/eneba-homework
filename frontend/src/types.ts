export type Language = 'en' | 'lt'

export interface User {
  id: number
  email: string
  name: string
}

export interface ProductSummary {
  id: number
  slug: string
  name: string
  platform: string
  region: string
  category: string
  image_url: string | null
  price: number
  original_price: number | null
  discount_percent: number
  rating: number
  rating_count: number
  best_offer_id: number | null
  best_offer_stock: number
  best_offer_seller: string | null
  is_wishlisted?: boolean
}

export interface SellerOffer {
  id: number
  seller_id: number
  seller_name: string
  seller_rating: number
  price: number
  currency: string
  stock: number
  delivery: string
}

export interface Review {
  id: number
  author_name: string
  rating: number
  comment: string
  created_at: string
}

export interface ProductDetail extends ProductSummary {
  description: string
  release_date: string | null
  offers: SellerOffer[]
  reviews: Review[]
  related: ProductSummary[]
  is_wishlisted: boolean
}

export interface HomeSection {
  id: number
  type: string
  title: string
  subtitle: string | null
  cta_label: string | null
  cta_url: string | null
  image_url: string | null
  products: ProductSummary[]
}

export interface HeroBlock {
  title: string
  subtitle: string | null
  cta_label: string | null
  cta_url: string | null
  image_url: string | null
}

export interface HomeData {
  hero: HeroBlock | null
  sections: HomeSection[]
}

export interface Filters {
  platforms: string[]
  regions: string[]
  categories: string[]
  price_min: number
  price_max: number
}

export interface ProductListResponse {
  products: ProductSummary[]
  total: number
  page: number
  per_page: number
  pages: number
}

export interface SearchResponse {
  products: ProductSummary[]
  total: number
  query: string
}

export interface CartItem {
  offerId: number
  productId: number
  slug: string
  name: string
  platform: string
  region: string
  imageUrl: string | null
  price: number
  sellerName: string
  stock: number
  quantity: number
}

export interface OrderItem {
  id: number
  product_id: number
  product_name: string
  seller_name: string
  unit_price: number
  quantity: number
  key_code: string
}

export interface Order {
  id: number
  total: number
  status: string
  created_at: string
  items: OrderItem[]
}

export interface AuthPayload {
  email: string
  password: string
  name?: string
}

export interface CheckoutPayload {
  items: Array<{ offer_id: number; quantity: number }>
}
