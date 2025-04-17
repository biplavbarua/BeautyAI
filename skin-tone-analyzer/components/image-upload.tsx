"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImageSelected: (imageData: string) => void
}

export default function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, etc.)")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds 10MB limit. Please select a smaller image.")
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const result = reader.result as string
        setPreviewUrl(result)
        onImageSelected(result)
      } catch (e) {
        console.error("Error processing image:", e)
        setError("Failed to process the selected image. Please try another image.")
      }
    }

    reader.onerror = () => {
      setError("Failed to read the selected file. Please try again.")
    }

    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id="image-upload"
      />

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>}

      {!previewUrl ? (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-rose-500" />
              <p className="text-sm text-gray-600">Click to upload an image</p>
              <p className="text-xs text-gray-400">JPG, PNG, GIF up to 10MB</p>
            </div>
          </label>
        </div>
      ) : (
        <div className="relative">
          <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover rounded-md" />
          <Button
            onClick={clearImage}
            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!previewUrl && (
        <label htmlFor="image-upload">
          <Button className="w-full bg-rose-600 hover:bg-rose-700 cursor-pointer" as="span">
            Select Image
          </Button>
        </label>
      )}
    </div>
  )
}

