"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="max-w-[1208px] mx-auto pt-6 md:pt-[44px] px-4 lg:px-0 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Ayhro Logo" width={40} height={40} />
          <span
            className="text-[#00FF85] font-medium"
            style={{
              fontFamily: "Delius",
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 400,
            }}
          >
            ayhro
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-white hover:text-[#00FF85] transition-colors">
            Services
          </Link>
          <Link href="#portfolio" className="text-white hover:text-[#00FF85] transition-colors">
            Projects
          </Link>
          <Link
            href="#testimonials"
            className="text-white hover:text-[#00FF85] transition-colors text-[#00FF85] border-b border-[#00FF85]"
          >
            Reviews
          </Link>
          <Link href="#contact" className="text-white hover:text-[#00FF85] transition-colors">
            Contact us
          </Link>
          <button className="bg-[#00FF85] text-black px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-colors font-medium">
            Get Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A1621] mt-2 p-4 rounded-lg shadow-lg z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="#services"
              className="text-white hover:text-[#00FF85] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#portfolio"
              className="text-white hover:text-[#00FF85] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#testimonials"
              className="text-white hover:text-[#00FF85] transition-colors text-[#00FF85] border-b border-[#00FF85] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link
              href="#contact"
              className="text-white hover:text-[#00FF85] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact us
            </Link>
            <button className="bg-[#00FF85] text-black px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-colors font-medium w-full">
              Get Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
