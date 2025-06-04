import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { toast } from 'react-toastify'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  const handleToggle = () => {
    toggleTheme()
    toast.success(
      isDark ? '☀️ Light mode activated!' : '🌙 Dark mode activated!',
      {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    )
  }

return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-20 z-50 p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon - shown in dark mode */}
        <Sun 
          className={`w-6 h-6 text-yellow-500 transition-all duration-300 absolute inset-0 ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-75'
          } group-hover:scale-110`}
        />
        
        {/* Moon Icon - shown in light mode */}
        <Moon 
          className={`w-6 h-6 text-blue-400 transition-all duration-300 absolute inset-0 ${
            !isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-75'
          } group-hover:scale-110`}
        />
      </div>
    </button>
  )
}

export default ThemeToggle