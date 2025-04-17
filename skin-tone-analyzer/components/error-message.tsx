"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "An error occurred while processing your request.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <div className="bg-red-100 p-3 rounded-full">
        <AlertTriangle className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-2 bg-rose-600 hover:bg-rose-700">
          Try Again
        </Button>
      )}
    </div>
  )
}

