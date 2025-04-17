import type { SkinToneResult } from "./types"

// This function creates a mock skin analysis based on a hash of the image data
// It's used as a fallback when the AI API fails
export function createMockSkinAnalysis(imageData: string): SkinToneResult {
  const skinTones = [
    {
      skinTone: "fair",
      colorHex: "#F5D5C5",
      undertone: "cool",
      characteristics: ["Burns easily", "Visible veins appear blue", "Silver jewelry complements well"],
      skinType: "combination",
      concerns: ["Redness", "Sun sensitivity"],
    },
    {
      skinTone: "light",
      colorHex: "#F0C5A3",
      undertone: "neutral",
      characteristics: [
        "Sometimes burns, sometimes tans",
        "Veins appear both blue and green",
        "Both gold and silver jewelry look good",
      ],
      skinType: "normal",
      concerns: ["Occasional breakouts", "Fine lines"],
    },
    {
      skinTone: "medium",
      colorHex: "#E5B887",
      undertone: "warm",
      characteristics: ["Tans easily", "Visible veins appear green", "Gold jewelry complements well"],
      skinType: "dry",
      concerns: ["Dullness", "Uneven texture"],
    },
    {
      skinTone: "olive",
      colorHex: "#C19A6B",
      undertone: "neutral",
      characteristics: [
        "Rarely burns, tans easily",
        "Greenish or yellowish tint to skin",
        "Gold jewelry complements well",
      ],
      skinType: "combination",
      concerns: ["Hyperpigmentation", "Dullness"],
    },
    {
      skinTone: "tan",
      colorHex: "#A67B5B",
      undertone: "warm",
      characteristics: ["Tans very easily, rarely burns", "Golden undertones", "Gold jewelry complements well"],
      skinType: "normal",
      concerns: ["Hyperpigmentation", "Uneven skin tone"],
    },
    {
      skinTone: "deep",
      colorHex: "#8D5A4C",
      undertone: "neutral",
      characteristics: [
        "Never burns, tans very easily",
        "Rich, deep complexion",
        "Both gold and silver jewelry look good",
      ],
      skinType: "normal",
      concerns: ["Hyperpigmentation", "Ashiness"],
    },
    {
      skinTone: "deep dark",
      colorHex: "#5C3C31",
      undertone: "warm",
      characteristics: ["Never burns", "Rich, very deep complexion", "Gold jewelry complements well"],
      skinType: "dry",
      concerns: ["Hyperpigmentation", "Ashiness"],
    },
  ]

  // For demo purposes, we'll use a hash of the image data to select a consistent result
  const hash = imageData.split("").reduce((acc, char, i) => {
    // Only use a portion of the string to avoid excessive computation
    if (i < 1000) {
      return acc + char.charCodeAt(0)
    }
    return acc
  }, 0)

  const index = Math.abs(hash % skinTones.length)

  return skinTones[index]
}

