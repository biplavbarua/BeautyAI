"use client"

// Simplified toast implementation for the prototype
import { useState, useCallback } from "react"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  duration?: number
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, ...props }

    setToasts((prev) => [...prev, newToast])

    if (props.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        dismiss(id)
      }, props.duration || 5000)
    }

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return {
    toast,
    toasts,
    dismiss,
  }
}

