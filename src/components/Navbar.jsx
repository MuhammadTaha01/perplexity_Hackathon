import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Chat with SONAR', path: '/chat' },
    { name: 'About Us', path: '/about' },
    { name: 'Get Started', path: '/get-started' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full bg-white bg-opacity-10 p-1"
          >
            <div className="h-full w-full rounded-full bg-white bg-opacity-80"></div>
          </motion.div>
          <span className="text-xl font-bold tracking-wider text-space-accent">
            COSMIC FRONTIER
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? 'nav-link active-nav-link' : 'nav-link'
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="relative z-50 block md:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="space-y-2">
            <motion.span
              animate={{ 
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0 
              }}
              className="block h-0.5 w-8 bg-space-accent"
            ></motion.span>
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="block h-0.5 w-8 bg-space-accent"
            ></motion.span>
            <motion.span
              animate={{ 
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0 
              }}
              className="block h-0.5 w-8 bg-space-accent"
            ></motion.span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="fixed inset-0 z-40 bg-space-dark"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className="flex h-full flex-col items-center justify-center space-y-8 p-8">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={`text-2xl font-medium ${
                location.pathname === link.path
                  ? 'text-space-accent'
                  : 'text-space-gray-300'
              }`}
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}

export default Navbar