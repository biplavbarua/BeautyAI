export interface SkinToneResult {
  skinTone: string
  colorHex: string
  undertone: string
  characteristics: string[]
  skinType: string
  concerns: string[]
}

export interface ProductRecommendation {
  id: string
  name: string
  brand: string
  category: "skincare" | "makeup" | "suncare"
  description: string
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
  purchaseUrl: string
  matchReason: string
}

