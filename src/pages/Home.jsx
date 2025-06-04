import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FFFC00 1px, transparent 0)`,
backgroundSize: '30px 30px'
      }}
    />
  </div>

  {/* Main Content */}
      <div className="relative z-10 h-screen">
        <MainFeature />

      {/* Floating Action Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-pulse"
style={{ animationDelay: '2s' }} />
    </motion.div>
  </div>
  </div>
)
}

export default Home