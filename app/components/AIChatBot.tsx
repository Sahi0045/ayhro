"use client"

import { useState, useEffect, useRef } from 'react'
import { FiSend } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bot, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Lion Icon Component
const LionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    {/* Main circle */}
    <circle
      cx="12"
      cy="12"
      r="10"
      className="stroke-current"
      strokeWidth="1.5"
      fill="transparent"
    />

    {/* Inner design - stylized A for Ayhro */}
    <path
      d="M12 6L16 16H8L12 6Z"
      className="stroke-current"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="transparent"
    />

    {/* Horizontal line */}
    <path
      d="M9 13H15"
      className="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Decorative dots */}
    <circle
      cx="12"
      cy="9"
      r="0.5"
      className="fill-current"
    />
    <circle
      cx="9.5"
      cy="14.5"
      r="0.5"
      className="fill-current"
    />
    <circle
      cx="14.5"
      cy="14.5"
      r="0.5"
      className="fill-current"
    />
  </svg>
)

interface Message {
  type: 'user' | 'bot'
  content: string | React.ReactNode
}

interface UserData {
  name: string
  email: string
  phone: string
  selectedService?: string
  projectDetails?: string
}

const services = [
  "Web Design - Crafting websites that convert and grow your business",
  "App Design - Beautifully designed apps that users love",
  "UI/UX Design - Best UI/UX for website and mobile apps",
  "Blockchain Development - Smart contracts & dApps development"
]

const availability = [
  "Monday to Friday: 9 AM - 6 PM IST",
  "Saturday: 10 AM - 2 PM IST",
  "24/7 Chat Support"
]

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hi! I'm Anthro, your AI assistant at Ayhro. I'd love to help you with your project. Could you please tell me your name?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState('name')
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const validatePhone = (phone: string) => {
    return phone.match(/^\+?[\d\s-]{10,}$/)
  }

  const handleServiceSelection = (service: string) => {
    setUserData(prev => ({ ...prev, selectedService: service }))
    setMessages(prev => [...prev, 
      { type: 'user', content: service },
      { type: 'bot', content: "Great choice! Could you please provide some details about your project?" }
    ])
    setCurrentStep('project_details')
  }

  const saveToDatabase = async (data: UserData) => {
    try {
      // Save to chat_submissions table for the chatbot
      const { error: dbError } = await supabase
        .from('chat_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.selectedService,
          project_details: data.projectDetails,
          status: 'new',
          created_at: new Date().toISOString()
        }])

      if (dbError) {
        console.error('Database error:', dbError)
        return false
      }

      return true
    } catch (error) {
      console.error('Error saving to database:', error)
      return false
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { type: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Process based on current step
    switch(currentStep) {
      case 'name':
        setUserData(prev => ({ ...prev, name: input }))
        setMessages(prev => [...prev, {
          type: 'bot',
          content: `Nice to meet you, ${input}! Could you please share your email address?`
        }])
        setCurrentStep('email')
        break

      case 'email':
        if (validateEmail(input)) {
          setUserData(prev => ({ ...prev, email: input }))
          setMessages(prev => [...prev, {
            type: 'bot',
            content: "Thanks! And your phone number please?"
          }])
          setCurrentStep('phone')
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: "That doesn't look like a valid email. Could you please check and try again?"
          }])
        }
        break

      case 'phone':
        if (validatePhone(input)) {
          setUserData(prev => ({ ...prev, phone: input }))
          setMessages(prev => [...prev, {
            type: 'bot',
            content: (
              <div className="space-y-4">
                <p>Thanks! Here are our services. Which one interests you?</p>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => handleServiceSelection(service)}
                      className="block w-full text-left px-3 py-2 rounded bg-[#1A2730] hover:bg-[#243440] transition-colors"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            )
          }])
          setCurrentStep('service_selection')
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: "That doesn't look like a valid phone number. Please enter a valid phone number."
          }])
        }
        break

      case 'project_details':
        const updatedUserData = {
          ...userData,
          projectDetails: input
        }
        setUserData(updatedUserData)
        
        // Save to database
        const savedSuccessfully = await saveToDatabase(updatedUserData)
        
        setMessages(prev => [...prev, {
          type: 'bot',
          content: (
            <div className="space-y-4">
              <p>Thank you for providing all the details! Here's what I've got:</p>
              <div className="space-y-2 bg-[#1A2730] p-4 rounded-lg">
                <p><strong>Name:</strong> {updatedUserData.name}</p>
                <p><strong>Email:</strong> {updatedUserData.email}</p>
                <p><strong>Phone:</strong> {updatedUserData.phone}</p>
                <p><strong>Service:</strong> {updatedUserData.selectedService}</p>
                <p><strong>Project Details:</strong> {input}</p>
              </div>
              {savedSuccessfully ? (
                <div className="space-y-4">
                  <p className="text-[#00FF85]">✓ Your information has been successfully saved!</p>
                  <p>Our sales team will contact you within the next 24 hours to discuss your project in detail.</p>
                  <div className="mt-4">
                    <p className="font-medium mb-2">Our Availability:</p>
                    {availability.map((time, index) => (
                      <p key={index} className="text-sm text-gray-400">{time}</p>
                    ))}
                  </div>
                  <p className="text-sm mt-4">In the meantime, feel free to ask any questions about our services!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-red-400">There seems to be a technical issue. Please try again or contact us directly at:</p>
                  <p className="text-[#00FF85]">✆ +91 9392954474</p>
                  <p className="text-[#00FF85]">✉ sahi0045@hotmail.com</p>
                </div>
              )}
            </div>
          )
        }])
        setCurrentStep('completed')
        break

      case 'completed':
        setMessages(prev => [...prev, {
          type: 'bot',
          content: "Is there anything else you'd like to know about our services?"
        }])
        break
    }

    setIsLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {/* Chat toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-lg backdrop-blur-sm ${
            isOpen 
              ? 'bg-[#1A2730] text-[#00FF85] border border-[#00FF85]/20' 
              : 'bg-[#1A2730]/80 text-[#00FF85] hover:bg-[#1A2730] border border-[#00FF85]/20'
          } hover:opacity-90 transition-all`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <LionIcon />
          )}
        </motion.button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-96 bg-[#0A1621] rounded-lg shadow-xl border border-[#00FF85]/20 overflow-hidden"
          >
            {/* Chat header */}
            <div className="p-4 bg-[#1A2730] border-b border-[#00FF85]/20">
              <div className="flex items-center gap-3">
                <LionIcon />
                <div>
                  <h3 className="font-medium text-white">Anthro AI Assistant</h3>
                  <p className="text-sm text-gray-400">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages container */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-[#00FF85] text-[#0A1621] font-medium rounded-br-none'
                        : 'bg-[#1A2730] text-white rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1A2730] rounded-2xl px-4 py-2 rounded-bl-none">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 bg-[#00FF85] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#00FF85] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-[#00FF85] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="p-4 border-t border-[#00FF85]/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    currentStep === 'name' ? "Enter your name..." :
                    currentStep === 'email' ? "Enter your email..." :
                    currentStep === 'phone' ? "Enter your phone number..." :
                    currentStep === 'project_details' ? "Tell us about your project..." :
                    "Type your message..."
                  }
                  className="flex-1 bg-[#0A1621] text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF85] border border-[#00FF85]/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-[#00FF85] text-[#0A1621] p-2 rounded-full hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 