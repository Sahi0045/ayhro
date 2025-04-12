'use client'

import { useState } from 'react'
import { X, Send, Bot } from 'lucide-react'

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

export default function ChatBot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

  const saveToDatabase = async (data: UserData) => {
    try {
      const response = await fetch('/api/chat-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.selectedService,
          project_details: data.projectDetails
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('API error:', result)
        return false
      }

      return true
    } catch (error) {
      console.error('Error saving to database:', error)
      return false
    }
  }

  const handleServiceSelection = (service: string) => {
    setUserData(prev => ({ ...prev, selectedService: service }))
    setMessages(prev => [...prev, 
      { type: 'user', content: service },
      { type: 'bot', content: "Great choice! Could you please provide some details about your project?" }
    ])
    setCurrentStep('project_details')
  }

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const validatePhone = (phone: string) => {
    return phone.match(/^\+?[\d\s-]{10,}$/)
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
                  <p className="text-[#00FF85]">✉ sahi0098@gmail.com</p>
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F1923] w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A1621] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#00FF85]" />
            <h3 className="text-white font-medium">Anthro - Ayhro AI Assistant</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-[#00FF85] text-black'
                    : 'bg-[#1A2730] text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1A2730] text-white max-w-[80%] rounded-2xl px-4 py-2">
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
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
              className="flex-1 bg-[#1A2730] text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF85]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-[#00FF85] text-black p-2 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 