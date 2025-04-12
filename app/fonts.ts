import { Inter, Space_Grotesk } from "next/font/google"

export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
})

// Use Inter as a fallback since we're having issues with Metropolis
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})
