import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { toast } from 'react-toastify'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  const handleToggle = () => {
    toggleTheme()
    if (isDark) {
      toast.success('Switched to light mode', {
        icon: '☀️',
        theme: 'light'
      })
    } else {
      toast.success('Switched to dark mode', {
        icon: '🌙',
        theme: 'dark'
      })
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 dark:bg-black/20 
                 backdrop-blur-md border border-white/20 dark:border-white/10
                 hover:bg-white/20 dark:hover:bg-black/30 
                 transition-all duration-300 ease-in-out
                 shadow-lg hover:shadow-xl
                 transform hover:scale-105 active:scale-95"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  )
}

export default ThemeToggle