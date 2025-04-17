"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RefreshCw } from "lucide-react"

interface CameraCaptureProps {
  onImageCaptured: (imageData: string) => void
}

export default function CameraCapture({ onImageCaptured }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [permission, setPermission] = useState<boolean | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      setError(null)

      // Request camera access with specific constraints for better compatibility
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        // Ensure video is playing before allowing capture
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch((e) => {
              console.error("Error playing video:", e)
              setError("Could not start video stream. Please try again.")
            })
          }
        }
      }

      setStream(mediaStream)
      setPermission(true)
      setIsCameraActive(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setPermission(false)
      setError("Camera access denied or not available. Please check your browser permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setIsCameraActive(false)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Make sure video dimensions are set correctly
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight

      if (videoWidth === 0 || videoHeight === 0) {
        setError("Video stream not ready. Please wait or restart camera.")
        return
      }

      // Set canvas dimensions to match video
      canvas.width = videoWidth
      canvas.height = videoHeight

      const context = canvas.getContext("2d")

      if (context) {
        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        try {
          // Convert canvas to data URL (JPEG format for better compatibility)
          const imageData = canvas.toDataURL("image/jpeg", 0.9)
          onImageCaptured(imageData)
          stopCamera()
        } catch (e) {
          console.error("Error capturing image:", e)
          setError("Failed to capture image. Please try again.")
        }
      }
    }
  }

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  if (permission === false) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-md">
        <p className="text-red-600 mb-2">Camera access denied</p>
        <p className="text-sm text-gray-600">
          Please enable camera access in your browser settings to use this feature.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-100 rounded-md overflow-hidden aspect-video">
        {!isCameraActive ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={startCamera} className="bg-rose-600 hover:bg-rose-700">
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>}

      <canvas ref={canvasRef} className="hidden" />

      {isCameraActive && (
        <div className="flex space-x-2">
          <Button onClick={captureImage} className="flex-1 bg-rose-600 hover:bg-rose-700">
            Capture
          </Button>
          <Button onClick={stopCamera} variant="outline" className="border-rose-300 text-rose-700">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

