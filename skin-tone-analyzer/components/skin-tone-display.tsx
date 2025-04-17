import type { SkinToneResult } from "@/lib/types"

interface SkinToneDisplayProps {
  result: SkinToneResult
}

export default function SkinToneDisplay({ result }: SkinToneDisplayProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-1">Skin Tone</h3>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: result.colorHex }} />
          <span className="text-sm capitalize">{result.skinTone}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-1">Undertone</h3>
        <span className="text-sm capitalize">{result.undertone}</span>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-1">Skin Type</h3>
        <span className="text-sm capitalize">{result.skinType}</span>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-1">Characteristics</h3>
        <ul className="text-sm space-y-1">
          {result.characteristics.map((char, index) => (
            <li key={index} className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>{char}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-1">Concerns</h3>
        <ul className="text-sm space-y-1">
          {result.concerns.map((concern, index) => (
            <li key={index} className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>{concern}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

