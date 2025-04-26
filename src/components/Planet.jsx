import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

function Planet({ 
  size = 'md', 
  color = 'white', 
  ring = false, 
  delay = 0,
  duration = 20,
  reverse = false,
  className = '',
  style = {}
}) {
  const planetRef = useRef(null)
  
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
    '2xl': 'w-64 h-64',
  }
  
  const colors = {
    white: 'bg-white',
    gray: 'bg-gray-400',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
  }
  
  useEffect(() => {
    if (!planetRef.current) return
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = planetRef.current.getBoundingClientRect()
      
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      const moveX = (clientX - centerX) / 20
      const moveY = (clientY - centerY) / 20
      
      planetRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return (
    <div ref={planetRef} className={`relative ${className}`} style={style}>
      <motion.div
        className={`planet rounded-full ${sizes[size]} ${colors[color]} opacity-90`}
        initial={{ rotate: 0 }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay
        }}
      />
      
      {ring && (
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-space-gray-400 rounded-full ${
            size === 'sm' ? 'w-20 h-6' : 
            size === 'md' ? 'w-32 h-8' :
            size === 'lg' ? 'w-40 h-10' : 
            size === 'xl' ? 'w-56 h-12' : 'w-72 h-16'
          }`}
          initial={{ rotate: 0 }}
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{
            duration: duration * 1.5,
            repeat: Infinity,
            ease: "linear",
            delay
          }}
          style={{ transform: 'translate(-50%, -50%) rotateX(75deg)' }}
        />
      )}
    </div>
  )
}

export default Planet