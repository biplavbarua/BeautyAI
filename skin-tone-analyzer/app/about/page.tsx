import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Sparkles, ShoppingBag, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="w-full max-w-4xl space-y-8 my-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-rose-900">How BeautyAI Works</h1>
          <p className="text-lg text-rose-700 max-w-2xl mx-auto">
            Our advanced AI technology analyzes your unique skin tone to provide personalized product recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="bg-rose-100 p-2 rounded-full">
                <Camera className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <CardTitle>Step 1: Capture</CardTitle>
                <CardDescription>Take a photo or upload an image</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our system works best with a clear, well-lit photo of your face. You can use your device's camera or
                upload an existing photo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="bg-rose-100 p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <CardTitle>Step 2: Analyze</CardTitle>
                <CardDescription>AI identifies your skin tone</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our advanced AI algorithms analyze your image to determine your exact skin tone, undertone, and unique
                characteristics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="bg-rose-100 p-2 rounded-full">
                <ShoppingBag className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <CardTitle>Step 3: Recommend</CardTitle>
                <CardDescription>Get personalized product suggestions</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Based on your analysis, we recommend products that are specifically formulated to complement your skin
                tone and address your unique needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="bg-rose-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Your data is protected</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Your images are processed securely and are not stored permanently. We prioritize your privacy and the
                security of your personal information.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/analyze">
            <Button className="bg-rose-600 hover:bg-rose-700">Try It Now</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

