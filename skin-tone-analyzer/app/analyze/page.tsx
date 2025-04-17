"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CameraCapture from "@/components/camera-capture"
import ImageUpload from "@/components/image-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AnalyzePage() {
  const router = useRouter()
  const { toast } = useToast() // Correctly use the useToast hook
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageCaptured = (imageData: string) => {
    setCapturedImage(imageData)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!capturedImage) {
      setError("Please capture or upload an image first")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Create form data to send the image
      const formData = new FormData()
      formData.append("image", capturedImage)

      // Call our API route
      const response = await fetch("/api/analyze-skin", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze image")
      }

      const data = await response.json()

      // Store the results in localStorage
      localStorage.setItem("analyzedImage", capturedImage)
      localStorage.setItem("skinAnalysis", JSON.stringify(data.analysis))
      localStorage.setItem("productRecommendations", JSON.stringify(data.recommendations))

      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Your skin has been analyzed successfully!",
        duration: 3000,
      })

      // Navigate to results page
      router.push("/results")
    } catch (error: any) {
      console.error("Error analyzing image:", error)
      setError(error.message || "An error occurred during analysis")

      toast({
        title: "Analysis Failed",
        description: "We couldn't analyze your skin. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="w-full max-w-md space-y-6 mt-8">
        <h1 className="text-3xl font-bold text-center text-rose-900">Analyze Your Skin</h1>

        <Card className="p-4">
          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="camera">Camera</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              <CameraCapture onImageCaptured={handleImageCaptured} />
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <ImageUpload onImageSelected={handleImageCaptured} />
            </TabsContent>
          </Tabs>

          {capturedImage && (
            <div className="mt-4 space-y-4">
              <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured skin"
                  className="w-full h-full object-cover"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
              )}

              <Button onClick={handleAnalyze} className="w-full bg-rose-600 hover:bg-rose-700" disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze My Skin"
                )}
              </Button>
            </div>
          )}
        </Card>

        <p className="text-sm text-center text-rose-700">
          Your image will be analyzed securely and won't be stored permanently.
        </p>
      </div>
    </main>
  )
}

