"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, ImageOff } from "lucide-react"
import type { ProductRecommendation } from "@/lib/types"

interface ProductDetailModalProps {
  product: ProductRecommendation | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [imageError, setImageError] = useState(false)

  if (!product) return null

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.brand}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 rounded-md overflow-hidden">
            {!imageError ? (
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 p-8">
                <ImageOff className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
              </div>
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Why It's Perfect For You</h4>
              <p className="text-sm text-rose-600">{product.matchReason}</p>
            </div>

            <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center">
                Shop Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

