import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  text?: string
}

export default function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Loader2 className="h-12 w-12 animate-spin text-rose-600" />
      <p className="text-rose-700 font-medium">{text}</p>
    </div>
  )
}

