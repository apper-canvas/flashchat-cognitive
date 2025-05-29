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

      {/* Status Bar */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 flex justify-between items-center p-4 pt-8 sm:pt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
<span className="text-gray-700 text-xs font-medium">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
<div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-700 rounded-full" />
            <div className="w-1 h-3 bg-gray-700 rounded-full" />
            <div className="w-1 h-3 bg-gray-500 rounded-full" />
            <div className="w-1 h-3 bg-gray-300 rounded-full" />
          </div>
          <ApperIcon name="Wifi" className="w-4 h-4 text-gray-700" />
          <ApperIcon name="Wifi" className="w-4 h-4 text-white/70" />
          <div className="flex items-center gap-1">
            <div className="w-6 h-3 border border-white/50 rounded-sm">
</div>
            <span className="text-xs text-gray-700">87%</span>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-[calc(100vh-80px)] sm:h-[calc(100vh-60px)]">
        <MainFeature />
      </div>

      {/* App Brand Indicator */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="px-4 py-1 bg-black/50 backdrop-blur-md rounded-full border border-primary/30">
          <span className="text-primary text-xs font-bold tracking-wide">FlashChat</span>
        </div>
      </motion.div>

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
  )
}

export default Home