import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

function TextReveal({ children, delay = 0.3, once = true, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const mainControls = useAnimation()
  
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    } else {
      mainControls.start('hidden')
    }
  }, [isInView, mainControls])
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: { y: 75, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default TextReveal