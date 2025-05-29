import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { toast } from 'react-toastify'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  const handleToggle = () => {
    toggleTheme()
    toast.success(
      `Switched to ${isDark ? 'light' : 'dark'} mode`,
      {
        icon: isDark ? '☀️' : '🌙',
        autoClose: 1500
      }
    )
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-full 
                 bg-white/10 dark:bg-black/20 backdrop-blur-md 
                 border border-white/20 dark:border-white/10
                 hover:bg-white/20 dark:hover:bg-black/30
                 transition-all duration-300 ease-in-out
                 hover:scale-110 active:scale-95
                 shadow-lg hover:shadow-xl
                 group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-yellow-500 
                     transition-all duration-500 ease-in-out
                     ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
                     group-hover:text-yellow-400`}
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-blue-300 
                     transition-all duration-500 ease-in-out
                     ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
                     group-hover:text-blue-200`}
        />
      </div>
    </button>
  )
}

export default ThemeToggle
