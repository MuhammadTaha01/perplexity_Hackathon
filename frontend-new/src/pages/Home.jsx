import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import TextReveal from '../components/TextReveal'
import Planet from '../components/Planet'

function Home() {
  const scrollRef = useRef(null)
  
  const handleScrollDown = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // This will be used to move elements based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const elements = document.querySelectorAll('.parallax')
      
      elements.forEach((el) => {
        const speed = el.dataset.speed || 0.1
        el.style.transform = `translateY(${scrollY * speed}px)`
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="fixed top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-50">
            <Planet 
              size="2xl" 
              color="gray" 
              ring={true} 
              duration={40} 
            />
          </div>
          <div className="fixed top-1/3 right-1/4 -translate-y-1/2 opacity-40">
            <Planet 
              size="lg" 
              color="white" 
              duration={25} 
              reverse={true} 
            />
          </div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeVariants}
              transition={{ duration: 1 }}
              className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl glow-text"
            >
              COSMIC FRONTIER
            </motion.h1>
            
            <motion.p 
              variants={fadeVariants}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-10 text-xl text-space-gray-300 md:text-2xl"
            >
              Explore the final frontier with cutting-edge technology and interstellar communications
            </motion.p>
            
            <motion.div
              variants={fadeVariants}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center"
            >
              <Link to="/login" className="glow-button rounded">
                BEGIN EXPLORATION
              </Link>
              <Link to="/about" className="glow-button rounded">
                CONTACT SONAR
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <button 
              onClick={handleScrollDown}
              className="flex flex-col items-center text-space-gray-400 hover:text-space-accent transition-colors"
            >
              <span className="mb-2">Scroll to Explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={scrollRef} 
        className="py-20 md:py-32"
      >
        <div className="container mx-auto px-4">
          <TextReveal className="mb-16 text-center">
            <h2 className="section-title">GALACTIC INNOVATIONS</h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-space-accent"></div>
          </TextReveal>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Quantum Communication",
                description: "Instant messaging across vast distances using quantum entanglement technology.",
                delay: 0.2
              },
              {
                title: "Neural Interface",
                description: "Direct mind-to-system connection for intuitive control of all space operations.",
                delay: 0.4
              },
              {
                title: "Stellar Mapping",
                description: "Advanced cartography system that plots unexplored regions with unprecedented accuracy.",
                delay: 0.6
              },
              {
                title: "Defense Matrix",
                description: "Automated protection system against cosmic radiation and space debris.",
                delay: 0.8
              },
              {
                title: "Cryo Preservation",
                description: "Revolutionary technology for long-duration space travel and exploration.",
                delay: 1.0
              },
              {
                title: "Gravitational Manipulation",
                description: "Control gravity fields to enhance mobility and resource gathering in space.",
                delay: 1.2
              }
            ].map((feature, index) => (
              <FadeIn 
                key={index} 
                direction="up" 
                delay={feature.delay}
                className="space-card"
              >
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-space-gray-800 opacity-20"></div>
                <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                <p className="text-space-gray-300">{feature.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-30 parallax" data-speed="0.05">
          <Planet size="xl" color="blue" duration={30} />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="section-title mb-6">OUR MISSION</h2>
              <div className="mb-8 h-1 w-24 bg-space-accent"></div>
              <p className="mb-6 text-lg text-space-gray-300">
                In the vast expanse of the cosmos, our mission is to connect humanity with the stars. Through advanced technology and pioneering research, we bridge the gap between Earth and the unknown.
              </p>
              <p className="mb-8 text-lg text-space-gray-300">
                Our team of brilliant scientists, engineers, and visionaries work tirelessly to develop tools that will propel human consciousness beyond our solar system and into the galactic community.
              </p>
              <Link to="/about" className="glow-button inline-block rounded">
                LEARN MORE
              </Link>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.4}>
              <div className="relative h-96 overflow-hidden rounded-lg border border-space-gray-700">
                <div className="absolute inset-0 flex items-center justify-center bg-space-dark bg-opacity-80">
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
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
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="10 8 16 12 10 16 10 8"/>
                      </svg>
                    </div>
                    <p className="text-xl">Watch Our Mission Video</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* SONAR Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <TextReveal className="mb-16 text-center">
            <h2 className="section-title">MEET SONAR</h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-space-accent"></div>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-space-gray-300">
              Our advanced AI assistant, designed to navigate the complexities of space exploration with you.
            </p>
          </TextReveal>
          
          <div className="mx-auto max-w-4xl">
            <div className="space-card overflow-hidden">
              <div className="mb-8 flex justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3
                  }}
                  className="relative h-32 w-32 rounded-full bg-space-accent/20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 10,
                      ease: "linear"
                    }}
                    className="absolute inset-0 rounded-full border-2 border-space-accent/30"
                    style={{ borderRadius: '50%' }}
                  ></motion.div>
                  <div className="absolute inset-4 rounded-full bg-space-accent/40"></div>
                  <div className="absolute inset-8 rounded-full bg-space-accent/60"></div>
                </motion.div>
              </div>
              
              <div className="mb-6 text-center">
                <h3 className="text-3xl font-bold tracking-wider">SONAR</h3>
                <p className="mt-2 text-space-gray-400">Stellar Operational Navigation and Research</p>
              </div>
              
              <div className="mb-8 space-y-4 text-space-gray-300">
                <p>
                  SONAR is our proprietary AI designed specifically for space communications and research. With advanced quantum processing capabilities, SONAR can analyze astronomical data, translate alien signals, and provide mission-critical information in real-time.
                </p>
                <p>
                  Using SONAR's interface, you can access a wealth of cosmic knowledge and receive guidance for your interstellar journey. Whether you're planning an expedition or researching distant galaxies, SONAR is your ultimate companion in space exploration.
                </p>
              </div>
              
              <div className="text-center">
                <Link to="/chat" className="glow-button inline-block rounded">
                  INITIATE COMMUNICATION
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 opacity-30 parallax" data-speed="-0.1">
          <Planet size="lg" color="purple" duration={25} reverse={true} />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="section-title mb-6">JOIN THE FRONTIER</h2>
              <p className="mb-10 text-xl text-space-gray-300">
                Ready to embark on your cosmic journey? Join us today and be part of humanity's greatest adventure.
              </p>
              <Link to="/get-started" className="glow-button inline-block rounded">
                BEGIN YOUR JOURNEY
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home