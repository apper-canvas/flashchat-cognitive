import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-50 dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-surface-800 text-white border border-primary/20"
          bodyClassName="text-white"
          progressClassName="bg-primary"
        />
      </div>
    </ThemeProvider>
  )
}


export default App