import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Router>
          <ThemeToggle />
          
          <main className="min-h-screen bg-surface-50 dark:bg-dark-100 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="mt-16"
          />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
