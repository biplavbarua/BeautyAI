"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SkinToneResult, ProductRecommendation } from "@/lib/types"
import ProductCard from "@/components/product-card"
import SkinToneDisplay from "@/components/skin-tone-display"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorMessage from "@/components/error-message"

export default function ResultsPage() {
  const [image, setImage] = useState<string | null>(null)
  const [skinToneResult, setSkinToneResult] = useState<SkinToneResult | null>(null)
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get the image and analysis results from localStorage
    const storedImage = localStorage.getItem("analyzedImage")
    const storedAnalysis = localStorage.getItem("skinAnalysis")
    const storedRecommendations = localStorage.getItem("productRecommendations")

    if (storedImage) {
      setImage(storedImage)
    } else {
      setError("No image found")
    }

    if (storedAnalysis) {
      try {
        const analysis = JSON.parse(storedAnalysis)
        setSkinToneResult(analysis)
      } catch (error) {
        console.error("Error parsing skin analysis:", error)
        setError("Failed to load analysis results")
      }
    } else {
      setError("No analysis results found")
    }

    if (storedRecommendations) {
      try {
        const recommendations = JSON.parse(storedRecommendations)
        setRecommendations(recommendations)
      } catch (error) {
        console.error("Error parsing recommendations:", error)
        setError("Failed to load product recommendations")
      }
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-rose-50 to-rose-100">
        <div className="w-full max-w-md">
          <LoadingSpinner text="Loading your results..." />
        </div>
      </main>
    )
  }

  if (error || !image || !skinToneResult) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-rose-50 to-rose-100">
        <div className="w-full max-w-md">
          <ErrorMessage
            title="Analysis Not Found"
            message={error || "Please go back and capture an image for analysis."}
            onRetry={() => (window.location.href = "/analyze")}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="w-full max-w-4xl space-y-6 my-8">
        <h1 className="text-3xl font-bold text-center text-rose-900">Your Skin Analysis Results</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Your Skin</CardTitle>
              <CardDescription>Analysis based on your image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                <img src={image || "/placeholder.svg"} alt="Analyzed skin" className="w-full h-full object-cover" />
              </div>

              <SkinToneDisplay result={skinToneResult} />
            </CardContent>
            <CardFooter>
              <Link href="/analyze" className="w-full">
                <Button variant="outline" className="w-full">
                  Retake Photo
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recommended Products</CardTitle>
              <CardDescription>Personalized for your skin tone</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="skincare">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="skincare">Skincare</TabsTrigger>
                  <TabsTrigger value="makeup">Makeup</TabsTrigger>
                  <TabsTrigger value="suncare">Sun Care</TabsTrigger>
                </TabsList>

                <TabsContent value="skincare" className="mt-4">
                  {recommendations.filter((product) => product.category === "skincare").length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendations
                        .filter((product) => product.category === "skincare")
                        .map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No skincare products found for your skin type.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="makeup" className="mt-4">
                  {recommendations.filter((product) => product.category === "makeup").length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendations
                        .filter((product) => product.category === "makeup")
                        .map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No makeup products found for your skin tone.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="suncare" className="mt-4">
                  {recommendations.filter((product) => product.category === "suncare").length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendations
                        .filter((product) => product.category === "suncare")
                        .map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No sun care products found for your skin type.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

