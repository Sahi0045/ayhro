"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import NetworkBackground from "../components/network-background"
import AIChatBot from "../components/AIChatBot"
import { supabase } from '@/lib/supabase'
import { toast, Toaster } from 'sonner'

export default function Quote() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('chat_submissions')
        .insert([{
          name: formData.fullName,
          email: formData.email,
          phone: formData.mobile,
          service: formData.budget,
          project_details: formData.message,
          status: 'new',
          created_at: new Date().toISOString()
        }])

      if (dbError) {
        throw dbError
      }

      toast.success('Message sent successfully!', {
        duration: 1750, // 1.75 seconds
      })
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        budget: "",
        timeline: "",
        message: "",
      })
    } catch (error: any) {
      console.error('Submission error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#1a232e] text-white relative overflow-hidden">
      <Toaster position="top-center" />
      {/* Animated Network Background */}
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Illustration */}
        <motion.div
          className="w-full md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/illustration.svg"
            alt="Designer working with dog illustration"
            width={600}
            height={600}
            priority
            className="max-w-full h-auto"
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="w-full md:w-1/2 md:pl-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-[#00FF85] uppercase font-medium mb-2">Get a Quote</div>
          <h1 className="text-[#00FF85] text-4xl md:text-5xl font-bold mb-8">Let's Bring Your Vision to Life!</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Input Your Name"
                className="w-full p-3 bg-[#0F1923] backdrop-blur-sm border border-[#00FF85]/20 text-white rounded-md focus:border-[#00FF85] focus:ring-2 focus:ring-[#00FF85]/20 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Input Your Email"
                  className="w-full p-3 bg-[#0F1923] backdrop-blur-sm border border-[#00FF85]/20 text-white rounded-md focus:border-[#00FF85] focus:ring-2 focus:ring-[#00FF85]/20 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block mb-2">
                  Mobile number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="91+"
                  className="w-full p-3 bg-[#0F1923] backdrop-blur-sm border border-[#00FF85]/20 text-white rounded-md focus:border-[#00FF85] focus:ring-2 focus:ring-[#00FF85]/20 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block mb-2">
                  Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0F1923] backdrop-blur-sm border border-[#00FF85]/20 text-white rounded-md focus:border-[#00FF85] focus:ring-2 focus:ring-[#00FF85]/20 transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select Budget
                  </option>
                  <option value="Web Design - Crafting websites that convert and grow your business">Web Design</option>
                  <option value="App Design - Beautifully designed apps that users love">App Design</option>
                  <option value="UI/UX Design - Best UI/UX for website and mobile apps">UI/UX Design</option>
                  <option value="Blockchain Development - Smart contracts & dApps development">Blockchain Development</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block mb-2">
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0F1923] backdrop-blur-sm border border-[#00FF85]/20 text-white rounded-md focus:border-[#00FF85] focus:ring-2 focus:ring-[#00FF85]/20 transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select Timeline
                  </option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Write Message..."
                className="w-full p-3 bg-[#0F1923] backdrop-blur-sm border border-[#00FF85]/20 text-white rounded-md focus:border-[#00FF85] focus:ring-2 focus:ring-[#00FF85]/20 transition-colors"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#00FF85] text-black px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* AI ChatBot */}
      <AIChatBot />
    </main>
  )
} 