import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isScrolled = scrollY > 50

  return (
    <div className="flex min-h-screen flex-col">
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-700 ${
          isScrolled 
            ? 'bg-space-dark/80 backdrop-blur-md' 
            : 'bg-transparent'
        }`}
      >
        <Navbar />
      </header>
      
      <motion.main 
        className="flex flex-1 flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  )
}

export default Layout