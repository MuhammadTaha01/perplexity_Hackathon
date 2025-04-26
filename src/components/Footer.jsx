import { motion } from 'framer-motion'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-space-gray-800 bg-space-dark py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">Cosmic Frontier</h3>
            <p className="text-space-gray-400">
              Exploring the boundaries of space technology and intergalactic communication.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-space-gray-400 transition-colors hover:text-space-accent">
                  Home
                </a>
              </li>
              <li>
                <a href="/chat" className="text-space-gray-400 transition-colors hover:text-space-accent">
                  Chat with SONAR
                </a>
              </li>
              <li>
                <a href="/about" className="text-space-gray-400 transition-colors hover:text-space-accent">
                  About Us
                </a>
              </li>
              <li>
                <a href="/get-started" className="text-space-gray-400 transition-colors hover:text-space-accent">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-bold">Connect</h3>
            <div className="flex space-x-4">
              {['Twitter', 'GitHub', 'LinkedIn'].map((platform) => (
                <motion.a
                  key={platform}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-space-gray-400 transition-colors hover:text-space-accent"
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-space-gray-800 pt-8 text-center text-space-gray-500">
          <p>&copy; {currentYear} Cosmic Frontier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer