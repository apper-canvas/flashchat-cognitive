import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FFFC00 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 text-center"
      >
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <ApperIcon name="Frown" className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl sm:text-8xl font-bold gradient-text mb-4"
        >
          404
        </motion.h1>

        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/70 text-lg sm:text-xl mb-8 max-w-md"
        >
          Oops! This snap disappeared into the void.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full text-black font-semibold text-lg hover:shadow-flash transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to FlashChat
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-20 h-20 border border-primary/20 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-16 h-16 border border-secondary/20 rounded-full"
        />
      </motion.div>
    </div>
  )
}

export default NotFound