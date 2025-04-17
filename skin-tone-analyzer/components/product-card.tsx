"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Info, ImageOff } from "lucide-react"
import type { ProductRecommendation } from "@/lib/types"
import ProductDetailModal from "./product-detail-modal"

interface ProductCardProps {
  product: ProductRecommendation
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  //  = useState(false)

  // Handle opening the product detail modal
  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <Card
        className="overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={openModal}
      >
        <div className="relative h-40 bg-gray-100">
          {!imageError ? (
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <ImageOff className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
          <CardDescription className="text-xs">{product.brand}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-grow">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
          <p className="font-medium mt-2">${product.price.toFixed(2)}</p>
          <p className="text-xs text-rose-600 mt-1 line-clamp-2">{product.matchReason}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 border-rose-300 text-rose-700"
            onClick={(e) => {
              e.stopPropagation()
              setIsModalOpen(true)
            }}
          >
            <Info className="mr-1 h-3 w-3" />
            Details
          </Button>

          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button className="text-xs h-8 bg-rose-600 hover:bg-rose-700 flex items-center justify-center">
              Shop
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </a>
        </CardFooter>
      </Card>

      <ProductDetailModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

