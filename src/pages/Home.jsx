import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const navigate = useNavigate()
const Home = () => {
  const navigate = useNavigate()
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
        {/* Create Avatar Button */}
        <motion.button
          onClick={() => navigate('/avatar-creation')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 
                   bg-[#FFFC00] text-black px-6 py-3 rounded-full
                   font-bold text-lg shadow-2xl hover:shadow-3xl
                   pointer-events-auto z-20 flex items-center gap-2
                   border-2 border-black/10 hover:border-black/20"
        >
          <User size={24} />
          Create Avatar
        </motion.button>

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