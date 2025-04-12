"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface TestimonialCardProps {
  testimonial: {
    id: number
    name: string
    position: string
    image: string
    quote: string
  }
  position: number // 0 = left, 1 = center, 2 = right
  direction: number // -1 = left, 1 = right
  isActive: boolean
}

export default function TestimonialCard({ testimonial, position, direction, isActive }: TestimonialCardProps) {
  // Calculate rotation and position based on card position
  const getXPosition = () => {
    if (position === 0) return "-35%"
    if (position === 2) return "35%"
    return "0%"
  }

  const getZIndex = () => {
    if (position === 1) return 30
    if (position === 0) return 20
    return 10
  }

  const getScale = () => {
    if (position === 1) return 1
    return 0.85
  }

  const getOpacity = () => {
    if (position === 1) return 1
    return 0.6
  }

  // Animation variants with smoother transitions
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "120%" : "-120%",
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
    center: {
      x: getXPosition(),
      opacity: getOpacity(),
      scale: getScale(),
      zIndex: getZIndex(),
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30, duration: 0.7 },
        opacity: { duration: 0.4 },
        scale: { type: "spring", stiffness: 200, damping: 25, duration: 0.7 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "120%" : "-120%",
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30, duration: 0.7 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.5 },
      },
    }),
  }

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 w-full max-w-md mx-auto"
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className={`bg-gradient-to-br from-black to-[#0a121f] rounded-3xl overflow-hidden shadow-xl p-8 h-[400px] flex flex-col relative border border-gray-800 transition-all duration-300 ${
          isActive ? "shadow-[0_0_30px_rgba(0,227,137,0.15)]" : ""
        }`}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 rounded-full border-2 border-[#00e389] flex items-center justify-center overflow-hidden">
            <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
          </div>
        </div>

        {/* Name and position */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
          <p className="text-gray-400 text-sm">{testimonial.position}</p>
        </div>

        {/* Quote marks */}
        <div className="text-[#00e389] text-4xl font-serif text-center mb-4">&ldquo;&rdquo;</div>

        {/* Testimonial */}
        <p className="text-center text-gray-300 flex-grow">{testimonial.quote}</p>

        {/* Decorative elements - subtle gradient accents */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00e389]/5 to-transparent opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#5b8def]/10 to-transparent opacity-20 pointer-events-none rounded-full"></div>
      </div>
    </motion.div>
  )
} 