'use client'

import Image from "next/image"
import Link from "next/link"
import { fontSans } from "./fonts"
import { Mail, ChevronLeft, ChevronRight, Linkedin, Instagram, Menu } from "lucide-react"
import ContactForm from "./components/contact-form"
import AIChatBot from "./components/AIChatBot"
import Footer from "./components/Footer"
import { useState, useEffect } from "react"
import NetworkAnimation from "@/app/components/NetworkAnimation"
import { motion, AnimatePresence } from "framer-motion"
import TestimonialCard from "./components/testimonial-card"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Hannah Schmitt",
    position: "Lead designer",
    image: "/testimonials/avatar1.jpg",
    quote:
      "Their blockchain expertise is next-level. They designed our dApp with such clarity that even our non-technical users found it intuitive. A perfect blend of design, functionality, and Web3 knowledge.",
  },
  {
    id: 2,
    name: "Jeetesh",
    position: "Project Head - JetSettrs",
    image: "/testimonials/avatar2.jpg",
    quote:
      "Working with the team was seamless. From user flow to final deployment, they nailed the UI/UX and delivered a stunning mobile and web app for JetSettrs. These guys get startup speed and design thinking — a rare combo.",
  },
  {
    id: 3,
    name: "Hannah Schmitt",
    position: "Lead designer",
    image: "/testimonials/avatar3.jpg",
    quote:
      "We were stuck between Web2 and Web3 — until we found them. Their hybrid knowledge helped us design and deploy a blockchain-based credentialing system in record time.",
  },
  {
    id: 4,
    name: "Michael Chen",
    position: "CTO - BlockFin",
    image: "/testimonials/avatar4.jpg",
    quote:
      "The team's ability to translate complex blockchain concepts into intuitive interfaces is unmatched. Our DeFi platform saw a 40% increase in user engagement after their redesign.",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    position: "Founder - MetaVerse Studios",
    image: "/testimonials/avatar5.jpg",
    quote:
      "From concept to execution, they delivered our NFT marketplace with precision and creativity. Their deep understanding of both design principles and blockchain technology made all the difference.",
  },
]

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)

  // Calculate indices for visible cards
  const visibleIndices = [
    currentIndex,
    (currentIndex + 1) % testimonials.length,
    (currentIndex + 2) % testimonials.length,
  ]

  // Handle navigation
  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    setAutoplay(false)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setAutoplay(false)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">Agency</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/#services" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link 
                href="/#portfolio" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Portfolio
              </Link>
              <Link 
                href="/#testimonials" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Testimonials
              </Link>
              <Link 
                href="/#contact" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/quote"
                className="bg-[#00e389] text-black px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        <NetworkAnimation />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1621]/90 via-[#0F1923]/90 to-[#020606]/90" />
        <main className={`relative z-10 min-h-screen text-white overflow-x-hidden ${fontSans.className} mb-[-31px]`}>
          <AIChatBot />
          
          {/* Hero Section */}
          <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
            <div className="absolute right-[10%] top-0 -mt-[150px] hidden md:block">
              <Image 
                src="/images/Vector.png" 
                alt="Vector" 
                width={180} 
                height={180} 
                style={{
                  color: "transparent",
                  marginRight: "238px",
                }}
              />
            </div>

            <h1
              className={`${fontSans.className} font-black text-3xl md:text-[51px] leading-[110%] md:leading-[100%] tracking-[-1%] text-center max-w-4xl mx-auto mt-20 md:mt-[200px]`}
            >
              Designing intuitive journeys
              <br />
              We build the digital <span className="text-[#00FF85]">tomorrow</span>
            </h1>

            <p className="mt-6 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              Get your desired design services from our talented designers,
              <br className="hidden md:block" />
              at a reasonable cost.
            </p>
            <div className="mt-8 flex flex-col items-center">
              <div className="flex flex-col sm:flex-row w-full max-w-md mx-auto items-center gap-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="bg-white text-gray-900 text-sm rounded-full block w-full pl-10 p-3 pr-4"
                    placeholder="Your work email"
                  />
                </div>
                <button className="w-[200px] bg-[#00FF85] text-black px-8 py-2 rounded-full hover:bg-opacity-90 transition-colors font-medium hover:shadow-lg hover:shadow-[#00FF85]/20">
                  Book a call
                </button>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-400">4.6/5.0</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      clipPath="inset(0 50% 0 0)"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">10+ Happy clients.</span>
              </div>
            </div>
          </section>

          {/* Features Section - Why Ayhro Is The Best Choice */}
          <section className="mt-20 mb-20 max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-20">
              Why Ayhro Is The Best Choice?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {/* Design-First, Tech-Driven */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#2D1E69]/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Design-First, Tech-Driven</h3>
                <p className="text-[#94A3B8] text-base max-w-[280px]">
                  We don't just build — we craft stunning, intuitive experiences that feel just right for your users.
                </p>
              </div>

              {/* End-to-End Expertise */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#69231E]/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12M2 7L12 12L22 7L12 2L2 7Z" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">End-to-End Expertise</h3>
                <p className="text-[#94A3B8] text-base max-w-[280px]">
                  From wireframes to Web3, we cover everything: UX/UI design, responsive web dev, mobile apps, and blockchain integration.
                </p>
              </div>

              {/* Agile, Fast, Reliable */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#5E691E]/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Agile, Fast, Reliable</h3>
                <p className="text-[#94A3B8] text-base max-w-[280px]">
                  Startups and founders love us because we move fast without breaking things. You get weekly updates and pixel-perfect deliveries.
                </p>
              </div>

              {/* Built for Gen Z Brands */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#5E691E]/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4H8V20H16V4ZM4 8H8M4 16H8M16 12H20" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Built for Gen Z Brands</h3>
                <p className="text-[#94A3B8] text-base max-w-[280px]">
                  We speak clean UI, bold visuals, and modern flows. Perfect for brands targeting digital-native users.
                </p>
              </div>

              {/* Modular & Scalable */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#1E3569]/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V8C21 7.45 20.8 6.979 20.4 6.59C20.021 6.197 19.55 6 19 6L12 2L5 6C4.45 6 3.979 6.2 3.59 6.59C3.197 6.979 3 7.45 3 8V16C3 16.55 3.197 17.021 3.59 17.41C3.979 17.8 4.45 18 5 18L12 22L19 18C19.55 18 20.021 17.8 20.4 17.41C20.8 17.021 21 16.55 21 16ZM12 12L3.27 7L12 2L20.73 7L12 12ZM12 22V12" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Modular & Scalable</h3>
                <p className="text-[#94A3B8] text-base max-w-[280px]">
                  Everything we build is future-proof. Want to add features later or scale to millions? We've got you covered.
                </p>
              </div>

              {/* Blockchain-Ready */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[64px] h-[64px] rounded-full bg-[#691E5E]/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58722 21.9983 7.99504C21.9983 6.40285 21.3658 4.87588 20.24 3.75004C19.1142 2.62419 17.5872 1.9917 15.995 1.9917C14.4028 1.9917 12.8758 2.62419 11.75 3.75004L5 10.5V19H13.5L20.24 12.24Z" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8L2 22M17.5 15H9" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Blockchain-Ready</h3>
                <p className="text-[#94A3B8] text-base max-w-[280px]">
                  We build smart contracts, dApps, and token-based systems with seamless wallet integration — you dream, we deploy.
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold text-center mb-20">The Service We Provide For You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Web Design Service */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[56px] h-[56px] mb-6 bg-[#00FF85]/10 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 18h10M8 6h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[#00FF85] font-semibold text-xl mb-2">Web Design</h3>
                  <p className="text-white/80 text-base">Crafting websites that convert and grow your business</p>
                </div>

                {/* App Design Service */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[56px] h-[56px] mb-6 bg-[#00FF85]/10 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 18V6M8.5 8.5h7M8.5 15.5h7M10 20h4M9 3h6" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[#00FF85] font-semibold text-xl mb-2">App Design</h3>
                  <p className="text-white/80 text-base">Beautifully designed apps that your users will love to use</p>
                </div>

                {/* UI & UX Service */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[56px] h-[56px] mb-6 bg-[#00FF85]/10 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[#00FF85] font-semibold text-xl mb-2">UI&UX</h3>
                  <p className="text-white/80 text-base">Get a best UI&UX for website mobile app</p>
                </div>

                {/* Blockchain Service */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[56px] h-[56px] mb-6 bg-[#00FF85]/10 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[#00FF85] font-semibold text-xl mb-2">Blockchain</h3>
                  <p className="text-white/80 text-base">Write and deploy smart contracts & Dapps</p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-12 md:py-20 max-w-7xl mx-auto px-4 relative">
            <h2 className="text-4xl font-bold text-center mb-20">
              Our Awesome Portfolio
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Mobile App */}
              <div className="group relative bg-[#0F1923] rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[16/10] relative">
                  <Image
                    src="/portfolio/mobile-app.png"
                    alt="Mobile App Portfolio"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Mobile App Design</span>
                  </div>
                </div>
              </div>

              {/* Cruise Search */}
              <div className="group relative bg-[#0F1923] rounded-2xl overflow-hidden md:translate-y-12 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[16/10] relative">
                  <Image
                    src="/portfolio/cruise-search.png"
                    alt="Cruise Search Website"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Cruise Search Platform</span>
                  </div>
                </div>
              </div>

              {/* Luxury Experience */}
              <div className="group relative bg-[#0F1923] rounded-2xl overflow-hidden md:translate-y-24 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[16/10] relative">
                  <Image
                    src="/portfolio/luxury-experience.png"
                    alt="Luxury Experience Website"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Luxury Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-12 md:py-20 max-w-6xl mx-auto px-4 relative">
            <div className="flex items-center justify-center mb-16 relative">
              <motion.button
                className="absolute left-0 md:left-10 text-[#00e389] hover:text-[#00e389]/80 transition-colors"
                onClick={handlePrev}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={36} />
              </motion.button>

              <motion.h2
                className={`${fontSans.className} text-3xl md:text-5xl font-bold text-center`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                What Our Clients Say About Us
              </motion.h2>

              <motion.button
                className="absolute right-0 md:right-10 text-[#00e389] hover:text-[#00e389]/80 transition-colors"
                onClick={handleNext}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={36} />
              </motion.button>
            </div>

            {/* Testimonial cards */}
            <div className="relative h-[500px] w-full">
              <AnimatePresence initial={false} custom={direction}>
                {visibleIndices.map((index, i) => (
                  <TestimonialCard
                    key={`${testimonials[index].id}-${i}`}
                    testimonial={testimonials[index]}
                    position={i}
                    direction={direction}
                    isActive={i === 1}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                    setAutoplay(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    visibleIndices.includes(index) ? "bg-[#00e389] scale-100" : "bg-white/30 scale-75"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </section>

          {/* Collaboration Section */}
          <section id="contact" className="py-12 md:py-20 max-w-6xl mx-auto px-4">
            <div className="border border-gray-700 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Illustration */}
                <div className="flex items-center justify-center p-8">
                  <Image
                    src="/collab/collaboration-illustration.png"
                    alt="Let's Collaborate"
                    width={700}
                    height={700}
                    className="object-contain"
                  />
                </div>

                {/* Right side - Form */}
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Floating Chat Button */}
      <AIChatBot />
    </div>
  )
}
