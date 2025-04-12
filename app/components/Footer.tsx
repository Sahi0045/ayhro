import Link from 'next/link'
import { Linkedin, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0A1621] h-[160px] mt-20 flex items-center">
      <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="order-2 md:order-1 flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Image src="/images/logo.png" alt="Ayhro Logo" width={120} height={120} className="object-contain" />
              <span
                className="text-[#00FF85] font-medium"
                style={{
                  fontFamily: "Delius",
                  fontSize: "38px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  marginLeft: "-55px",
                }}
              >
                ayhro
              </span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20 mx-4"></div>
            <p className="text-white/60 text-base whitespace-nowrap">© Copyright {new Date().getFullYear()} , All right reserved</p>
          </div>

          {/* Links and Social */}
          <div className="flex items-center gap-10 lg:gap-16 order-1 md:order-2">
            <div className="flex items-center gap-8 lg:gap-14">
              <Link href="/privacy-policy" className="text-white/60 hover:text-[#00FF85] transition-colors text-base whitespace-nowrap">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-white/60 hover:text-[#00FF85] transition-colors text-base whitespace-nowrap">
                Terms
              </Link>
              <Link href="tel:+919392954474" className="text-white/60 hover:text-[#00FF85] transition-colors text-base whitespace-nowrap flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00FF85]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Get in Touch
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="#" 
                className="bg-white w-12 h-12 rounded flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Linkedin className="w-6 h-6 text-[#0A1621]" />
              </Link>
              <Link 
                href="https://www.instagram.com/ayhro.tech/" 
                className="bg-white w-12 h-12 rounded flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-6 h-6 text-[#0A1621]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 