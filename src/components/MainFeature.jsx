import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [currentView, setCurrentView] = useState('camera') // camera, stories, chat
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedMedia, setCapturedMedia] = useState(null)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'alex_flash', text: '👻', type: 'received', timer: 5, viewed: false },
    { id: 2, sender: 'sarah_snap', text: 'Check this out! 📸', type: 'received', timer: 10, viewed: false },
    { id: 3, sender: 'mike_moments', text: 'Party tonight? 🎉', type: 'received', timer: 3, viewed: true }
  ])
  const [stories, setStories] = useState([
    { id: 1, user: 'alex_flash', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', hasNew: true },
    { id: 2, user: 'sarah_snap', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', hasNew: true },
    { id: 3, user: 'mike_moments', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', hasNew: false },
    { id: 4, user: 'emma_flash', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', hasNew: true }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [viewingStory, setViewingStory] = useState(null)
  const [mediaTimer, setMediaTimer] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('normal')
  const [showFilters, setShowFilters] = useState(false)
  const [filters] = useState([
    { id: 'normal', name: 'Normal', css: 'none' },
    { id: 'vintage', name: 'Vintage', css: 'sepia(0.5) contrast(1.2) brightness(1.1)' },
    { id: 'bw', name: 'B&W', css: 'grayscale(1) contrast(1.2)' },
    { id: 'sepia', name: 'Sepia', css: 'sepia(1) brightness(1.1)' },
    { id: 'cold', name: 'Cold', css: 'hue-rotate(180deg) saturate(1.3)' },
    { id: 'warm', name: 'Warm', css: 'hue-rotate(25deg) saturate(1.4) brightness(1.1)' },
    { id: 'bright', name: 'Bright', css: 'brightness(1.4) contrast(1.1)' },
    { id: 'dark', name: 'Dark', css: 'brightness(0.7) contrast(1.3)' },
    { id: 'retro', name: 'Retro', css: 'sepia(0.4) saturate(1.8) hue-rotate(315deg) brightness(1.1)' },
    { id: 'vivid', name: 'Vivid', css: 'saturate(2) contrast(1.3) brightness(1.1)' }
  ])

  const cameraRef = useRef(null)

  
  const selectFilter = (filter) => {
    setSelectedFilter(filter.id)
    toast.success(`🎨 ${filter.name} filter applied!`, {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }
  
  const getCurrentFilter = () => {
    return filters.find(f => f.id === selectedFilter) || filters[0]
  }

  // Simulate camera capture
  const handleCapture = () => {
    setIsCapturing(true)
    
    // Flash effect
    document.body.style.background = 'white'
    setTimeout(() => {
      document.body.style.background = ''
    }, 100)

    setTimeout(() => {
      const currentFilter = getCurrentFilter()
      const mockImage = `https://images.unsplash.com/photo-${Date.now() % 10 === 0 ? '1506905925473-2c1f2e3e' : '1516985080664-3a590d9ca1a6'}?w=400&h=600&fit=crop`
      setCapturedMedia({ 
        type: 'image', 
        url: mockImage, 
        timestamp: Date.now(),
        filter: currentFilter
      })
      setIsCapturing(false)
      toast.success('📸 Snap captured!', {
        icon: false,
        className: 'bg-black border border-primary/30'
      })
    }, 1000)

  }

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedFriend) return
    
    const message = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      type: 'sent',
      timer: 5,
      viewed: false
    }
    
    setMessages(prev => [...prev, message])
    setNewMessage('')
    toast.success('💬 Message sent!', {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const viewMessage = (messageId) => {
    const message = messages.find(m => m.id === messageId && !m.viewed)
    if (!message) return

    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, viewed: true } : m
    ))

    // Start countdown timer
    let timeLeft = message.timer
    setMediaTimer(timeLeft)
    
    const interval = setInterval(() => {
      timeLeft -= 1
      setMediaTimer(timeLeft)
      
      if (timeLeft <= 0) {
        clearInterval(interval)
        setMediaTimer(null)
        toast.info('💨 Message disappeared!', {
          icon: false,
          className: 'bg-black border border-secondary/30'
        })
      }
    }, 1000)
  }

  const viewStory = (story) => {
    setViewingStory(story)
    setTimeout(() => {
      setViewingStory(null)
      setStories(prev => prev.map(s => 
        s.id === story.id ? { ...s, hasNew: false } : s
      ))
    }, 3000)
  }

  return (
    <div className="relative h-full w-full">
      {/* Navigation */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/20">
          {[
            { key: 'stories', icon: 'Users', label: 'Stories' },
            { key: 'camera', icon: 'Camera', label: 'Camera' },
            { key: 'chat', icon: 'MessageCircle', label: 'Chat' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setCurrentView(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                currentView === tab.key
                  ? 'bg-primary text-black shadow-flash'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4 mx-auto" />
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Camera View */}
        {currentView === 'camera' && (
          <motion.div
            key="camera"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="h-full flex flex-col"
          >
            {/* Camera Preview */}
            <div className="flex-1 relative bg-gradient-to-b from-surface-900 to-black rounded-3xl mx-4 mt-20 mb-6 overflow-hidden">
              {capturedMedia ? (
                <div className="relative h-full">
                  <img 
                    src={capturedMedia.url} 
                    alt="Captured" 
                    className="w-full h-full object-cover filter-transition"
                    style={{ filter: capturedMedia.filter?.css || 'none' }}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <button
                    onClick={() => setCapturedMedia(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                  >
                    <ApperIcon name="X" className="w-5 h-5 text-white" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <button className="px-6 py-3 bg-primary text-black rounded-full font-semibold hover:shadow-flash transform hover:scale-105 transition-all">
                      Send Snap
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center relative">
                  <div 
                    className="absolute inset-0 filter-transition"
                    style={{ 
                      filter: getCurrentFilter().css,
                      background: 'linear-gradient(135deg, rgba(100, 100, 100, 0.3), rgba(50, 50, 50, 0.3))'
                    }}
                  />
                  <div className="text-center relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-white/10">
                      <ApperIcon name="Camera" className="w-16 h-16 text-white/50" />
                    </div>
                    <p className="text-white/70 text-lg">Ready to capture a moment</p>
                    <p className="text-white/50 text-sm mt-2">{getCurrentFilter().name} filter active</p>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  className="mx-4 mb-4"
                >
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold text-sm">Choose Filter</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-6 h-6 flex items-center justify-center"
                      >
                        <ApperIcon name="ChevronDown" className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {filters.map((filter) => (
                        <motion.button
                          key={filter.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: filters.indexOf(filter) * 0.05 }}
                          onClick={() => selectFilter(filter)}
                          className={`filter-button ${selectedFilter === filter.id ? 'active' : ''}`}
                        >
                          <div className="flex flex-col items-center justify-center h-full p-1">
                            <div 
                              className="w-8 h-8 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-lg mb-1 filter-preview"
                              style={{ filter: filter.css }}
                            />
                            <span className="text-xs text-white/80 font-medium truncate">
                              {filter.name}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


            {/* Camera Controls */}
            <div className="flex justify-center items-center pb-8 gap-8">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                  showFilters 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <ApperIcon name="Palette" className="w-6 h-6" />
              </button>
              
              <motion.button
                onClick={handleCapture}
                disabled={isCapturing}
                whileTap={{ scale: 0.9 }}
                className={`capture-button flex items-center justify-center ${
                  isCapturing ? 'animate-pulse' : ''
                }`}
              >
                {isCapturing ? (
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <ApperIcon name="Circle" className="w-12 h-12 text-black" />
                  </div>
                )}
              </motion.button>

              <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all">
                <ApperIcon name="RotateCcw" className="w-6 h-6 text-white" />
              </button>
            </div>

          </motion.div>
        )}

        {/* Stories View */}
        {currentView === 'stories' && (
          <motion.div
            key="stories"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="h-full px-4 pt-20"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: story.id * 0.1 }}
                  onClick={() => viewStory(story)}
                  className="aspect-[3/4] relative cursor-pointer group"
                >
                  <div className={`absolute inset-0 rounded-2xl p-0.5 ${
                    story.hasNew ? 'story-ring' : 'bg-white/20'
                  }`}>
                    <div className="w-full h-full bg-black rounded-2xl overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1506905925473-2c1f2e3e74e6?w=300&h=400&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                        alt={story.user}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <img 
                          src={story.avatar} 
                          alt={story.user}
                          className="w-6 h-6 rounded-full border border-white/50"
                        />
                        <span className="text-white text-xs font-medium text-shadow">
                          {story.user}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat View */}
        {currentView === 'chat' && (
          <motion.div
            key="chat"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="h-full flex flex-col pt-20"
          >
            {!selectedFriend ? (
              <div className="flex-1 px-4">
                <h2 className="text-2xl font-bold gradient-text mb-6">Chats</h2>
                <div className="space-y-3">
                  {['alex_flash', 'sarah_snap', 'mike_moments', 'emma_flash'].map((friend, index) => (
                    <motion.div
                      key={friend}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedFriend(friend)}
                      className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-lg">
                              {friend[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{friend}</h3>
                          <p className="text-sm text-white/60">Tap to chat</p>
                        </div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-4 pb-4 border-b border-white/10">
                  <button 
                    onClick={() => setSelectedFriend(null)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <ApperIcon name="ArrowLeft" className="w-5 h-5 text-white" />
                  </button>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">
                      {selectedFriend[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{selectedFriend}</h3>
                    <p className="text-xs text-white/60">Active now</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        onClick={() => viewMessage(message.id)}
                        className={`chat-bubble cursor-pointer ${
                          message.type === 'sent'
                            ? 'bg-primary text-black'
                            : message.viewed
                            ? 'bg-white/10 text-white/50'
                            : 'bg-secondary text-white'
                        } ${!message.viewed && message.type === 'received' ? 'animate-bounce-soft' : ''}`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {!message.viewed && message.type === 'received' && (
                          <div className="flex items-center gap-1 mt-1">
                            <ApperIcon name="Timer" className="w-3 h-3" />
                            <span className="text-xs">{message.timer}s</span>
                          </div>
                        )}
                        {mediaTimer && (
                          <div className="mt-2 text-center">
                            <div className="text-lg font-bold">{mediaTimer}</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Send a chat..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-primary/50"
                    />
                    <button
                      onClick={sendMessage}
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black hover:shadow-flash transform hover:scale-105 transition-all"
                    >
                      <ApperIcon name="Send" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {viewingStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full"
            >
              <img 
                src={`https://images.unsplash.com/photo-1516985080664-3a590d9ca1a6?w=400&h=800&fit=crop&auto=format&q=80`}
                alt="Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={viewingStory.avatar} 
                    alt={viewingStory.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-medium text-shadow">{viewingStory.user}</span>
                  <span className="text-white/70 text-sm">2h</span>
                </div>
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
              <button
                onClick={() => setViewingStory(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <ApperIcon name="X" className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature