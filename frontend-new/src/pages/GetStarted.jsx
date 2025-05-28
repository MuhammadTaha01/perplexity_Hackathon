import { useState } from 'react'
import { motion } from 'framer-motion'
import TextReveal from '../components/TextReveal'
import FadeIn from '../components/FadeIn'
import Planet from '../components/Planet'

function GetStarted() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  })
  
  const steps = [
    {
      title: "Personal Information",
      fields: ["name", "email"]
    },
    {
      title: "Space Interests",
      fields: ["interest"]
    },
    {
      title: "Additional Details",
      fields: ["message"]
    },
    {
      title: "Confirmation",
      fields: []
    }
  ]
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1)
    }
  }
  
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, this would submit the data to a server
    handleNextStep()
  }
  
  // Check if current step is valid
  const isStepValid = () => {
    if (activeStep === steps.length - 1) return true
    
    return steps[activeStep].fields.every(field => formData[field].trim() !== '')
  }
  
  return (
    <div className="relative min-h-screen pt-20">
      <div className="absolute -right-32 bottom-1/3 opacity-30">
        <Planet size="2xl" color="orange" duration={50} reverse={true} />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <TextReveal className="mb-12 text-center">
          <h1 className="section-title">BEGIN YOUR JOURNEY</h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-space-accent"></div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-space-gray-300">
            Join the Cosmic Frontier initiative and become part of humanity's greatest adventure.
          </p>
        </TextReveal>
        
        <FadeIn className="mx-auto max-w-4xl">
          <div className="space-card">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="relative flex justify-between">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        index <= activeStep 
                          ? 'border-space-accent bg-space-accent text-space-dark' 
                          : 'border-space-gray-600 bg-space-dark text-space-gray-400'
                      }`}
                    >
                      {index < activeStep ? (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    <span className={`mt-2 text-sm ${
                      index <= activeStep 
                        ? 'text-space-accent' 
                        : 'text-space-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-0 top-5 h-0.5 w-full bg-space-gray-700">
                        <div 
                          className="h-full bg-space-accent transition-all duration-500"
                          style={{ 
                            width: index < activeStep ? '100%' : '0%',
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Form Steps */}
            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>
                  
                  <div className="mb-6">
                    <label htmlFor="name" className="mb-2 block text-space-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-space-gray-700 bg-space-gray-900 px-4 py-2 text-space-gray-200 outline-none focus:border-space-accent/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="mb-2 block text-space-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-space-gray-700 bg-space-gray-900 px-4 py-2 text-space-gray-200 outline-none focus:border-space-accent/50"
                      placeholder="Enter your email address"
                    />
                  </div>
                </motion.div>
              )}
              
              {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mb-6 text-2xl font-bold">Space Interests</h2>
                  
                  <div className="mb-6">
                    <label htmlFor="interest" className="mb-2 block text-space-gray-300">
                      Primary Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-space-gray-700 bg-space-gray-900 px-4 py-2 text-space-gray-200 outline-none focus:border-space-accent/50"
                    >
                      <option value="">Select your primary interest</option>
                      <option value="Communication">Space Communication</option>
                      <option value="Exploration">Deep Space Exploration</option>
                      <option value="Research">Astronomical Research</option>
                      <option value="Technology">Space Technology Development</option>
                      <option value="Colonization">Space Colonization</option>
                    </select>
                  </div>
                </motion.div>
              )}
              
              {activeStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mb-6 text-2xl font-bold">Additional Details</h2>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="mb-2 block text-space-gray-300">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full rounded-md border border-space-gray-700 bg-space-gray-900 px-4 py-2 text-space-gray-200 outline-none focus:border-space-accent/50"
                      placeholder="Tell us more about your interest in space exploration"
                    ></textarea>
                  </div>
                </motion.div>
              )}
              
              {activeStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-space-accent bg-opacity-20">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-space-accent"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  
                  <h2 className="mb-4 text-2xl font-bold">Application Submitted</h2>
                  <p className="mb-8 text-space-gray-300">
                    Thank you for your interest in joining the Cosmic Frontier initiative. We'll review your application and contact you shortly.
                  </p>
                  
                  <div className="space-card border-space-accent/30 bg-space-gray-900/50">
                    <h3 className="mb-4 text-xl font-bold">Application Summary</h3>
                    <div className="mb-4 text-left">
                      <div className="mb-2 grid grid-cols-3">
                        <span className="font-semibold text-space-gray-400">Name:</span>
                        <span className="col-span-2">{formData.name}</span>
                      </div>
                      <div className="mb-2 grid grid-cols-3">
                        <span className="font-semibold text-space-gray-400">Email:</span>
                        <span className="col-span-2">{formData.email}</span>
                      </div>
                      <div className="mb-2 grid grid-cols-3">
                        <span className="font-semibold text-space-gray-400">Interest:</span>
                        <span className="col-span-2">{formData.interest}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Navigation Buttons */}
              {activeStep < 3 && (
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={activeStep === 0}
                    className={`rounded-md px-6 py-2 transition-all duration-300 ${
                      activeStep === 0 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'border border-space-gray-600 bg-space-gray-800 text-space-gray-200 hover:border-space-gray-500'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <button
                    type={activeStep === steps.length - 2 ? 'submit' : 'button'}
                    onClick={activeStep === steps.length - 2 ? null : handleNextStep}
                    disabled={!isStepValid()}
                    className={`glow-button rounded-md ${
                      !isStepValid() ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    {activeStep === steps.length - 2 ? 'Submit' : 'Next'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default GetStarted