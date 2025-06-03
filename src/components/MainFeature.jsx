import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { useTheme } from '../contexts/ThemeContext'
import { toast } from 'react-toastify'

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

  const navigate = useNavigate()
  const { isDark } = useTheme()
  
  // Profile state
  const [profile, setProfile] = useState({
    displayName: 'John Doe',
    username: '@johndoe123',
    bio: 'Living life one snap at a time! 📸✨',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
    snapsSent: 1247,
    storiesPosted: 89,
    friendsCount: 156,
    isEditing: false
  })
  
  // Chat states
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [emojiCategory, setEmojiCategory] = useState('smileys')
  
  // Story viewing state
  const [viewingStory, setViewingStory] = useState(null)
  
  // Modal states
  const [showShareModal, setShowShareModal] = useState(false)
const [pendingRequests, setPendingRequests] = useState([])
  
  const sendFriendRequest = (friend) => {
    if (pendingRequests.includes(friend.id)) {
      toast.info('Friend request already sent!', {
        icon: false,
        className: 'bg-black border border-primary/30'
      })
      return
    }

    setPendingRequests(prev => [...prev, friend.id])
    setProfile(prev => ({ ...prev, friendsCount: prev.friendsCount + 1 }))
    
    toast.success(`Friend request sent to ${friend.displayName}! 🤝`, {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

const openAddFriends = () => {
    navigate('/add-friends')
    toast.info('🔍 Discover and add new friends!', {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }
  const [settings, setSettings] = useState({
    notifications: {
      messages: true,
      stories: true,
      friends: false,
      marketing: false
    },
    privacy: {
      viewStories: 'friends',
      receiveMessages: 'everyone',
      findByPhone: true,
      showOnline: true
    },
    display: {
      darkMode: false,
      language: 'en',
      soundEffects: true
    }
  })
  const [emojis] = useState({
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐'],
    gestures: ['👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷'],
    food: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞'],
    travel: ['✈️', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🚁', '🛸', '🚀', '🛰️', '💺', '⛵', '🚤', '🛥️', '🚢', '⚓', '🚧', '⛽', '🚏', '🗺️', '🏖️', '🏝️', '⛰️', '🏔️', '🗻', '🏕️', '🏞️'],
    objects: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⏳', '⌛', '📡', '🔋'],
    symbols: ['💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴']
  })
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
    
    toast.success('Message sent! 📤', {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
    toast.info(showEmojiPicker ? 'Emoji picker closed' : '😊 Choose an emoji!', {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const insertEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji)
    toast.success(`${emoji} added!`, {
      icon: false,
      className: 'bg-black border border-primary/30',
      autoClose: 1000
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
          {['stories', 'camera', 'chat', 'settings', 'profile'].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === view
                  ? 'bg-primary text-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {view === 'stories' && <ApperIcon name="Users" className="w-4 h-4" />}
              {view === 'camera' && <ApperIcon name="Camera" className="w-4 h-4" />}
              {view === 'chat' && <ApperIcon name="MessageCircle" className="w-4 h-4" />}
              {view === 'settings' && <ApperIcon name="Settings" className="w-4 h-4" />}
              {view === 'profile' && <ApperIcon name="User" className="w-4 h-4" />}
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
                    <p className="text-gray-700 text-lg">Ready to capture a moment</p>
                    <p className="text-gray-500 text-sm mt-2">{getCurrentFilter().name} filter active</p>
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
<h3 className="text-gray-800 font-semibold text-sm">Choose Filter</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-6 h-6 flex items-center justify-center"
                      >
<ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-600" />
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
<span className="text-xs text-gray-700 font-medium truncate">
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
            <div className="flex items-center justify-between px-6 pb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <ApperIcon name="Sliders" className="w-6 h-6 text-gray-700" />
              </button>

              <motion.button
                onClick={handleCapture}
                disabled={isCapturing}
                whileTap={{ scale: 0.95 }}
                className="relative"
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
                <ApperIcon name="RotateCcw" className="w-6 h-6 text-gray-700" />
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
<h3 className="font-semibold text-gray-800">{friend}</h3>
                          <p className="text-sm text-gray-600">Tap to chat</p>
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
<ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-800" />
                  </button>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">
                      {selectedFriend[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
<h3 className="font-semibold text-gray-800">{selectedFriend}</h3>
                    <p className="text-xs text-gray-600">Active now</p>
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
? 'bg-gray-200 text-gray-500'
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
{/* Emoji Picker */}
                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="mb-4"
                      >
                        <div className="glass-card p-4 max-h-64 overflow-hidden">
                          {/* Category Tabs */}
                          <div className="flex gap-2 mb-3 overflow-x-auto">
                            {Object.keys(emojis).map((category) => (
                              <button
                                key={category}
                                onClick={() => setEmojiCategory(category)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                  emojiCategory === category
                                    ? 'bg-primary text-black'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </button>
                            ))}
                          </div>
                          
                          {/* Emoji Grid */}
                          <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto">
                            {emojis[emojiCategory].map((emoji, index) => (
                              <motion.button
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.01 }}
                                onClick={() => insertEmoji(emoji)}
                                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-200 rounded-lg transition-all transform hover:scale-110"
                              >
                                {emoji}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex gap-3 items-center">
<input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-primary/50"
                    />
                    <button
                      onClick={toggleEmojiPicker}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        showEmojiPicker 
                          ? 'bg-primary text-black' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
>
                      <ApperIcon name="Smile" className="w-5 h-5" />
                    </button>
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
{/* Settings View */}
        {currentView === 'settings' && (
          <motion.div
            key="settings"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="h-full px-4 pt-20 pb-8 overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            
            {/* Notifications Settings */}
            <div className="glass-card p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
              <div className="space-y-3">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <button
                      onClick={() => {
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [key]: !value }
                        }))
                        toast.success(`${key} notifications ${!value ? 'enabled' : 'disabled'}`, {
                          icon: false,
                          className: 'bg-black border border-primary/30'
                        })
                      }}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        value ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                        value ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="glass-card p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Who can view your stories</label>
                  <select
                    value={settings.privacy.viewStories}
                    onChange={(e) => {
                      setSettings(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, viewStories: e.target.value }
                      }))
                      toast.success('Story privacy updated', {
                        icon: false,
                        className: 'bg-black border border-primary/30'
                      })
                    }}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="friends">Friends only</option>
                    <option value="nobody">Nobody</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Who can message you</label>
                  <select
                    value={settings.privacy.receiveMessages}
                    onChange={(e) => {
                      setSettings(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, receiveMessages: e.target.value }
                      }))
                      toast.success('Message privacy updated', {
                        icon: false,
                        className: 'bg-black border border-primary/30'
                      })
                    }}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="friends">Friends only</option>
                    <option value="nobody">Nobody</option>
                  </select>
                </div>
                {['findByPhone', 'showOnline'].map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <button
                      onClick={() => {
                        setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, [key]: !prev.privacy[key] }
                        }))
                        toast.success(`${key} ${!settings.privacy[key] ? 'enabled' : 'disabled'}`, {
                          icon: false,
                          className: 'bg-black border border-primary/30'
                        })
                      }}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        settings.privacy[key] ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                        settings.privacy[key] ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Display Settings */}
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Display</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Dark Mode</span>
                  <button
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev,
                        display: { ...prev.display, darkMode: !prev.display.darkMode }
                      }))
                      toast.success(`Dark mode ${!settings.display.darkMode ? 'enabled' : 'disabled'}`, {
                        icon: false,
                        className: 'bg-black border border-primary/30'
                      })
                    }}
                    className={`w-12 h-6 rounded-full transition-all relative ${
                      settings.display.darkMode ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                      settings.display.darkMode ? 'right-0.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.display.language}
                    onChange={(e) => {
                      setSettings(prev => ({
                        ...prev,
                        display: { ...prev.display, language: e.target.value }
                      }))
                      toast.success('Language updated', {
                        icon: false,
                        className: 'bg-black border border-primary/30'
                      })
                    }}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Sound Effects</span>
                  <button
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev,
                        display: { ...prev.display, soundEffects: !prev.display.soundEffects }
                      }))
                      toast.success(`Sound effects ${!settings.display.soundEffects ? 'enabled' : 'disabled'}`, {
                        icon: false,
                        className: 'bg-black border border-primary/30'
                      })
                    }}
                    className={`w-12 h-6 rounded-full transition-all relative ${
                      settings.display.soundEffects ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                      settings.display.soundEffects ? 'right-0.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile View */}
        {currentView === 'profile' && (
          <motion.div
            key="profile"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="h-full px-4 pt-20 pb-8 overflow-y-auto"
          >
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-primary"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <ApperIcon name="Camera" className="w-4 h-4 text-black" />
                </button>
              </div>
              
              {profile.isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-center text-gray-800"
                    placeholder="Display Name"
                  />
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-center text-gray-800"
                    placeholder="Username"
                  />
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-center text-gray-800 resize-none"
                    placeholder="Bio"
                    rows="2"
                  />
                  <div className="flex gap-2 justify-center">
<button
                      onClick={() => {
                        setProfile(prev => ({ ...prev, isEditing: false }))
                        toast.success('Profile updated!', {
                          icon: false,
                          className: 'bg-black border border-primary/30'
                        })
                      }}
                      className="px-4 py-2 bg-primary text-black rounded-lg font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setProfile(prev => ({ ...prev, isEditing: false }))}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">{profile.displayName}</h1>
                  <p className="text-gray-600 mb-2">{profile.username}</p>
                  <p className="text-gray-700 text-sm mb-4">{profile.bio}</p>
                  <button
                    onClick={() => setProfile(prev => ({ ...prev, isEditing: true }))}
                    className="px-4 py-2 bg-primary text-black rounded-lg font-medium hover:shadow-flash transform hover:scale-105 transition-all"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{profile.snapsSent}</div>
                <div className="text-gray-600 text-sm">Snaps Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{profile.storiesPosted}</div>
                <div className="text-gray-600 text-sm">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{profile.friendsCount}</div>
                <div className="text-gray-600 text-sm">Friends</div>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="space-y-3">
              <button 
                onClick={openAddFriends}
                className="w-full glass-card p-4 text-left hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ApperIcon name="UserPlus" className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-800">Add Friends</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  navigate('/stories-archive')
                  toast.info('📚 Browse your archived stories!', {
                    icon: false,
                    className: 'bg-black border border-primary/30'
                  })
                }}
                className="w-full glass-card p-4 text-left hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ApperIcon name="Archive" className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-800">My Stories Archive</span>
                </div>
              </button>
              <button className="w-full glass-card p-4 text-left hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Heart" className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-800">Favorites</span>
                </div>
              </button>
              <button 
                className="flex items-center justify-center space-x-3 w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => setShowShareModal(true)}
              >
                <ApperIcon name="Share" className="w-5 h-5" />
                <span className="font-medium">Share Profile</span>
              </button>
            </div>
          </motion.div>
        )}
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

      {/* Share Profile Modal */}
      <AnimatePresence>
        {showShareModal && (
          <ShareProfileModal 
            onClose={() => setShowShareModal(false)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
}

// Share Profile Modal Component
const ShareProfileModal = ({ onClose, isDark }) => {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)
  const profileUrl = `${window.location.origin}/profile/johndoe123`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      toast.success('Profile link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link. Please try again.')
    }
  }

  const handleSocialShare = (platform) => {
    const encodedUrl = encodeURIComponent(profileUrl)
    const text = encodeURIComponent('Check out my FlashChat profile!')
    
    let shareUrl = ''
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${encodedUrl}`
        break
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so copy to clipboard
        handleCopyLink()
        toast.info('Link copied! Paste it in your Instagram story or bio.')
        return
      default:
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
    toast.success(`Shared to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`)
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out my FlashChat profile!')
    const body = encodeURIComponent(`Hey! Check out my FlashChat profile: ${profileUrl}`)
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`
    
    window.location.href = mailtoUrl
    toast.success('Email client opened!')
  }

  const generateQR = () => {
    setIsGeneratingQR(true)
    // Simulate QR generation
    setTimeout(() => {
      setIsGeneratingQR(false)
      toast.success('QR code generated!')
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${
          isDark 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Share Profile
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              isDark ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Preview */}
        <div className={`p-4 rounded-xl mb-6 ${
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">JD</span>
            </div>
            <div>
              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                John Doe
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                @johndoe123
              </p>
            </div>
          </div>
        </div>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`w-full p-4 rounded-xl border-2 border-dashed transition-all duration-200 mb-4 ${
            isDark 
              ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-900'
          }`}
        >
          <div className="flex items-center justify-center space-x-3">
            <ApperIcon name="Copy" className="w-5 h-5" />
            <span className="font-medium">Copy Profile Link</span>
          </div>
        </button>

        {/* Social Media Sharing */}
        <div className="mb-6">
          <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Share on social media
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialShare('facebook')}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ApperIcon name="Facebook" className="w-4 h-4" />
              <span className="text-sm">Facebook</span>
            </button>
            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex items-center justify-center space-x-2 p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
            >
              <ApperIcon name="Twitter" className="w-4 h-4" />
              <span className="text-sm">Twitter</span>
            </button>
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
            >
              <ApperIcon name="Linkedin" className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </button>
            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <ApperIcon name="MessageCircle" className="w-4 h-4" />
              <span className="text-sm">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Other Options */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleEmailShare}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            <ApperIcon name="Mail" className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </button>
          <button
            onClick={generateQR}
            disabled={isGeneratingQR}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-800' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:bg-gray-50'
            }`}
          >
            {isGeneratingQR ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ApperIcon name="Loader2" className="w-4 h-4" />
              </motion.div>
            ) : (
              <ApperIcon name="QrCode" className="w-4 h-4" />
            )}
            <span className="text-sm">QR Code</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
)
}