import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import TextReveal from '../components/TextReveal'
import FadeIn from '../components/FadeIn'
import Planet from '../components/Planet'

function ChatWithSonar() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'sonar', 
      text: 'Greetings, explorer. I am SONAR, your guide to the cosmos. <b>How may I assist you today?</b>',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false) // ✅ Loader state
  const chatEndRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true) // ✅ Show loader

    try {
      const response = await fetch('http://0.0.0.0:8080/api/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [{ role: 'user', content: input }],
          stream: false
        })
      })

      if (!response.ok) throw new Error(`Server error: ${response.statusText}`)

      const data = await response.json()
      const assistantReply = data.choices[0]?.message?.content || "Sorry, I couldn't understand that."

      const sonarMessage = {
        id: messages.length + 2,
        sender: 'sonar',
        text: assistantReply,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, sonarMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          sender: 'sonar',
          text: 'Sorry, there was a problem connecting to SONAR.',
          timestamp: new Date()
        }
      ])
    } finally {
      setLoading(false) // ✅ Hide loader
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="relative min-h-screen pt-20">
      <div className="absolute top-1/4 right-1/3 -translate-y-1/2 opacity-20">
        <Planet size="xl" color="blue" duration={50} />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <TextReveal className="mb-12 text-center">
          <h1 className="section-title">COMMUNICATE WITH SONAR</h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-space-accent"></div>
        </TextReveal>
        
        <FadeIn className="mx-auto max-w-4xl" delay={0.3}>
          <div className="space-card mb-6 h-[500px] overflow-hidden">
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-center space-x-4 border-b border-space-gray-700 pb-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="relative h-10 w-10 rounded-full bg-space-accent/20"
                >
                  <div className="absolute inset-2 rounded-full bg-space-accent/60"></div>
                </motion.div>
                <div>
                  <h3 className="font-bold">SONAR</h3>
                  <div className="flex items-center text-sm text-space-gray-400">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                    Online
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto space-y-4 p-2">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-space-gray-700 text-space-accent' 
                          : 'bg-green-100 text-green-900 border border-green-300 font-mono'
                      }`}
                    >
                      {/* ✅ Render Rich HTML for SONAR */}
                      {message.sender === 'sonar' ? (
                        <div dangerouslySetInnerHTML={{ __html: message.text }} />
                      ) : (
                        <p>{message.text}</p>
                      )}
                      <p className="mt-1 text-right text-xs text-space-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </motion.div>
                  </div>
                ))}

                {/* ✅ Loader while waiting */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg border border-green-300 bg-green-100 p-3 font-mono text-green-800 animate-pulse">
                      Generating response...
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-md border border-space-gray-700 bg-space-gray-900 px-4 py-2 text-space-gray-200 outline-none focus:border-space-accent/50"
                />
                <button
                  type="submit"
                  className="glow-button rounded-md"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* About SONAR */}
          <div className="space-card">
            <h3 className="mb-4 text-xl font-bold">About SONAR</h3>
            <p className="mb-4 text-space-gray-300">
              SONAR (Stellar Operational Navigation and Research) is our advanced AI designed for space communication and research. With quantum computing capabilities, SONAR can assist you with:
            </p>
            <ul className="mb-4 space-y-2 text-space-gray-300">
              <li className="flex items-center"><span className="mr-2 text-space-accent">•</span> Real-time stellar analysis and navigation recommendations</li>
              <li className="flex items-center"><span className="mr-2 text-space-accent">•</span> Interpretation of cosmic signals and anomalies</li>
              <li className="flex items-center"><span className="mr-2 text-space-accent">•</span> Access to the galactic research database</li>
              <li className="flex items-center"><span className="mr-2 text-space-accent">•</span> Mission planning and resource optimization</li>
            </ul>
            <p className="text-space-gray-400">
              Note: This is a simulation of the SONAR system. In a real deployment, SONAR would be connected to our quantum network and provide accurate astronomical data and analysis.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default ChatWithSonar
