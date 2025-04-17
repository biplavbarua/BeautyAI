import { NextResponse } from "next/server"
import { createMockSkinAnalysis } from "@/lib/mock-skin-analysis"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const imageData = formData.get("image") as string

    if (!imageData) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 })
    }

    // For this prototype, we'll use the mock analysis since the API integration is having issues
    // In a production app, you would properly integrate with the AI API
    const mockAnalysis = createMockSkinAnalysis(imageData)
    const mockRecommendations = getMockRecommendations(mockAnalysis)

    // Simulate a delay to mimic API processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      analysis: mockAnalysis,
      recommendations: mockRecommendations,
    })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getMockRecommendations(skinAnalysis: any) {
  const skinTone = skinAnalysis.skinTone || "medium"
  const skinType = skinAnalysis.skinType || "normal"
  const undertone = skinAnalysis.undertone || "neutral"

  return [
    // Skincare products
    {
      id: "sk1",
      name: "Hydrating Serum",
      brand: "The Ordinary",
      category: "skincare",
      description: "Hyaluronic Acid 2% + B5 hydrating formula",
      price: 8.9,
      rating: 4.7,
      reviewCount: 3420,
      imageUrl: "https://www.sephora.com/productimages/sku/s2031375-main-zoom.jpg",
      purchaseUrl: "https://www.sephora.com/product/the-ordinary-hyaluronic-acid-2-b5-P427419",
      matchReason: `Hydrating formula suitable for ${skinTone} skin with ${skinType} type`,
    },
    {
      id: "sk2",
      name: "Vitamin C Serum",
      brand: "Drunk Elephant",
      category: "skincare",
      description: "C-Firma Fresh Day Serum brightens and firms",
      price: 78.0,
      rating: 4.5,
      reviewCount: 2180,
      imageUrl: "https://www.sephora.com/productimages/sku/s2404846-main-zoom.jpg",
      purchaseUrl: "https://www.sephora.com/product/drunk-elephant-c-firma-fresh-day-serum-P477081",
      matchReason: `Brightening formula ideal for ${skinTone} skin tone`,
    },
    {
      id: "sk3",
      name: "Gentle Exfoliator",
      brand: "Paula's Choice",
      category: "skincare",
      description: "2% BHA Liquid Exfoliant for unclogging pores",
      price: 34.0,
      rating: 4.8,
      reviewCount: 5870,
      imageUrl: "https://www.sephora.com/productimages/sku/s2421311-main-zoom.jpg",
      purchaseUrl: "https://www.sephora.com/product/skin-perfecting-2-bha-liquid-exfoliant-P469502",
      matchReason: `Gentle exfoliation for ${skinType} skin type`,
    },

    // Makeup products
    {
      id: "mk1",
      name: "Skin Tint",
      brand: "ILIA",
      category: "makeup",
      description: "Super Serum Skin Tint SPF 40 Foundation",
      price: 48.0,
      rating: 4.6,
      reviewCount: 4560,
      imageUrl: "https://www.sephora.com/productimages/sku/s2418663-main-zoom.jpg",
      purchaseUrl: "https://www.sephora.com/product/ilia-super-serum-skin-tint-spf-40-P466223",
      matchReason: `Light coverage perfect for ${skinTone} skin tone`,
    },
    {
      id: "mk2",
      name: "Cream Blush",
      brand: "Rare Beauty",
      category: "makeup",
      description: "Soft Pinch Liquid Blush for a natural flush",
      price: 23.0,
      rating: 4.7,
      reviewCount: 6230,
      imageUrl: "https://www.sephora.com/productimages/sku/s2518959-main-zoom.jpg",
      purchaseUrl: "https://www.sephora.com/product/rare-beauty-by-selena-gomez-soft-pinch-liquid-blush-P97989732",
      matchReason: `Shade complements ${skinTone} skin with ${undertone} undertones`,
    },
    {
      id: "mk3",
      name: "Concealer",
      brand: "NARS",
      category: "makeup",
      description: "Radiant Creamy Concealer for medium coverage",
      price: 32.0,
      rating: 4.8,
      reviewCount: 12300,
      imageUrl: "https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg",
      purchaseUrl: "https://www.sephora.com/product/radiant-creamy-concealer-P377873",
      matchReason: `Perfect match for ${skinTone} skin tone`,
    },

    // Suncare products
    {
      id: "sc1",
      name: "Invisible Sunscreen",
      brand: "Supergoop!",
      category: "suncare",
      description: "Unseen Sunscreen SPF 40 with no white cast",
      price: 38.0,
      rating: 4.9,
      reviewCount: 5210,
      imageUrl: "https://www.sephora.com/productimages/sku/s2315935-main-zoom.jpg",
      purchaseUrl: "https://www.sephora.com/product/supergoop-unseen-sunscreen-spf-40-P454380",
      matchReason: `Invisible formula perfect for ${skinTone} skin tone`,
    },
    {
      id: "sc2",
      name: "Tinted Sunscreen",
      brand: "Tower 28",
      category: "suncare",
      description: "SunnyDays SPF 30 Tinted Sunscreen Foundation",
      price: 32.0,
      rating: 4.4,
      reviewCount: 1780,
      imageUrl: "https://www.sephora.com/productimages/sku/s2448058-main-zoom.jpg",
      purchaseUrl:
        "https://www.sephora.com/product/tower-28-beauty-sunny-days-spf-30-tinted-sunscreen-foundation-P475873",
      matchReason: `Tint matched to ${skinTone} skin tone`,
    },
    {
      id: "sc3",
      name: "Mineral Sunscreen",
      brand: "Summer Fridays",
      category: "suncare",
      description: "ShadeDrops Broad Spectrum SPF 30 Mineral Milk Sunscreen",
      price: 38.0,
      rating: 4.6,
      reviewCount: 1250,
      imageUrl: "https://www.sephora.com/productimages/sku/s2589463-main-zoom.jpg",
      purchaseUrl:
        "https://www.sephora.com/product/summer-fridays-shadedrops-broad-spectrum-spf-30-mineral-milk-sunscreen-P500302",
      matchReason: `Gentle mineral formula suitable for ${skinType} skin type`,
    },
  ]
}

