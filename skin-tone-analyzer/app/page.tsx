import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="w-full max-w-md text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-rose-900">BeautyAI</h1>
        <p className="text-lg text-rose-700">
          Get personalized skincare recommendations based on your unique skin tone
        </p>
        <div className="flex flex-col space-y-4">
          <Link href="/analyze" className="w-full">
            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">Analyze My Skin</Button>
          </Link>
          <Link href="/about" className="w-full">
            <Button variant="outline" className="w-full border-rose-300 text-rose-700">
              How It Works
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

