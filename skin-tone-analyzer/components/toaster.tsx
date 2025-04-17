"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-md shadow-md bg-white border-l-4 ${
            toast.variant === "destructive" ? "border-red-500" : "border-rose-500"
          } animate-in slide-in-from-right`}
        >
          <div className="flex justify-between items-start">
            <div>
              {toast.title && (
                <h3 className={`font-medium ${toast.variant === "destructive" ? "text-red-700" : "text-rose-700"}`}>
                  {toast.title}
                </h3>
              )}
              {toast.description && <p className="text-sm text-gray-600 mt-1">{toast.description}</p>}
            </div>
            <button onClick={() => toast.id && dismiss(toast.id)} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

