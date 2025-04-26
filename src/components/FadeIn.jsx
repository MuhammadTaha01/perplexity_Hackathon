import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

function FadeIn({ 
  children, 
  direction = null, 
  delay = 0.2, 
  distance = 50, 
  once = true,
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const mainControls = useAnimation()
  
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? -distance : direction === 'down' ? distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }
  
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    } else {
      mainControls.start('hidden')
    }
  }, [isInView, mainControls])
  
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={mainControls}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn