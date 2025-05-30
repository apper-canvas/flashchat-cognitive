import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, Filter, Grid, List, Heart, Share, Eye, Calendar, Star, MessageCircle, Play, Image } from 'lucide-react'
import { toast } from 'react-toastify'

const Favorites = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [filterBy, setFilterBy] = useState('all') // all, posts, stories, media
  const [selectedItem, setSelectedItem] = useState(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock favorites data
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      type: 'post',
      title: 'Amazing sunset view',
      content: 'Just captured this beautiful sunset from my balcony. Nature never fails to amaze me! 🌅',
      image: 'https://images.unsplash.com/photo-1506905925473-2c1f2e3e74e6?w=400&h=400&fit=crop',
      author: 'Sarah Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b798?w=50&h=50&fit=crop&crop=face',
      likes: 124,
      comments: 18,
      createdAt: new Date('2024-01-15'),
      isFavorite: true
    },
    {
      id: 2,
      type: 'story',
      title: 'Weekend Adventure',
      content: 'Hiking through the mountains',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop',
      author: 'Mike Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      duration: 15,
      views: 89,
      createdAt: new Date('2024-01-12'),
      isFavorite: true
    },
    {
      id: 3,
      type: 'media',
      title: 'Coffee Art',
      content: 'Perfect latte art to start the day',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
      author: 'Emma Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      likes: 76,
      comments: 12,
      createdAt: new Date('2024-01-10'),
      isFavorite: true
    },
    {
      id: 4,
      type: 'post',
      title: 'City nightlife',
      content: 'The energy of the city at night is unmatched. Neon lights and endless possibilities! ✨',
      image: 'https://images.unsplash.com/photo-1516985080664-3a590d9ca1a6?w=400&h=400&fit=crop',
      author: 'Alex Rodriguez',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      likes: 203,
      comments: 34,
      createdAt: new Date('2024-01-08'),
      isFavorite: true
    },
    {
      id: 5,
      type: 'story',
      title: 'Food Festival',
      content: 'Trying amazing street food',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
      author: 'Lisa Park',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face',
      duration: 20,
      views: 156,
      createdAt: new Date('2024-01-05'),
      isFavorite: true
    },
    {
      id: 6,
      type: 'media',
      title: 'Nature Photography',
      content: 'Wildlife in their natural habitat',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop',
      author: 'David Kim',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
      likes: 312,
      comments: 45,
      createdAt: new Date('2024-01-02'),
      isFavorite: true
    }
  ])

  useEffect(() => {
    // Simulate loading favorites
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter favorites based on search and filter criteria
  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (filterBy) {
      case 'posts':
        return matchesSearch && item.type === 'post'
      case 'stories':
        return matchesSearch && item.type === 'story'
      case 'media':
        return matchesSearch && item.type === 'media'
      default:
        return matchesSearch
    }
  })

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsViewerOpen(true)
    toast.info(`Viewing: ${item.title}`, {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const handleRemoveFromFavorites = (itemId) => {
    const item = favorites.find(f => f.id === itemId)
    if (window.confirm(`Remove "${item?.title}" from favorites?`)) {
      setFavorites(prev => prev.filter(fav => fav.id !== itemId))
      toast.success('Removed from favorites!', {
        icon: false,
        className: 'bg-black border border-secondary/30'
      })
    }
  }

  const handleShareItem = (item) => {
    navigator.clipboard?.writeText(`Check out this ${item.type}: ${item.title} by ${item.author}`)
    toast.success('Link copied to clipboard!', {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'post':
        return <MessageCircle size={16} className="text-blue-500" />
      case 'story':
        return <Play size={16} className="text-purple-500" />
      case 'media':
        return <Image size={16} className="text-green-500" />
      default:
        return <Star size={16} className="text-primary" />
    }
  }

  const FavoriteCard = ({ item, isGridView }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card overflow-hidden cursor-pointer group ${
        isGridView ? 'aspect-square' : 'flex items-center p-4'
      }`}
      onClick={() => handleItemClick(item)}
    >
      {isGridView ? (
        <div className="relative h-full">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Content Type Indicator */}
          <div className="absolute top-3 left-3">
            {getContentTypeIcon(item.type)}
          </div>

          {/* Favorite Indicator */}
          <div className="absolute top-3 right-3">
            <Heart size={16} className="text-primary fill-current" />
          </div>

          {/* Author Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={item.authorAvatar}
                alt={item.author}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-white text-sm font-medium">{item.author}</span>
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-white/80 text-xs line-clamp-2">{item.content}</p>
            <div className="flex items-center justify-between text-white/60 text-xs mt-2">
              <span>{item.createdAt.toLocaleDateString()}</span>
              {item.type === 'story' ? (
                <span>{item.views} views</span>
              ) : (
                <span>{item.likes} likes</span>
              )}
            </div>
          </div>

          {/* Action Buttons (visible on hover) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShareItem(item)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Share size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleItemClick(item)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Eye size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFromFavorites(item.id)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/50 transition-colors"
              >
                <Heart size={16} className="text-white fill-current" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 w-full">
          <div className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="absolute top-1 left-1">
              {getContentTypeIcon(item.type)}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={item.authorAvatar}
                alt={item.author}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-gray-700 text-sm">{item.author}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.content}</p>
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span>{item.createdAt.toLocaleDateString()}</span>
              {item.type === 'story' ? (
                <span>{item.views} views</span>
              ) : (
                <>
                  <span>{item.likes} likes</span>
                  <span>{item.comments} comments</span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleShareItem(item)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Share size={14} className="text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleItemClick(item)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Eye size={14} className="text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFromFavorites(item.id)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <Heart size={14} className="text-primary fill-current" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-white to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 glass-card hover:bg-white/20 transition-colors rounded-lg"
            >
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Favorites</option>
                <option value="posts">Posts</option>
                <option value="stories">Stories</option>
                <option value="media">Media</option>
              </select>
            </div>
          </div>
        </div>

        {/* Favorites Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredFavorites.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
              : 'space-y-4'
          }>
            {filteredFavorites.map(item => (
              <FavoriteCard key={item.id} item={item} isGridView={viewMode === 'grid'} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Heart size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No favorites found' : 'No favorites yet'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No favorites match "${searchQuery}"`
                : 'Start favoriting posts, stories, and media to see them here'
              }
            </p>
          </div>
        )}

        {/* Favorites Count */}
        {!isLoading && filteredFavorites.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Showing {filteredFavorites.length} of {favorites.length} favorites
          </div>
        )}
      </div>

      {/* Item Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsViewerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-md mx-auto glass-card overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full aspect-square object-cover"
              />
              
              {/* Header */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedItem.authorAvatar}
                      alt={selectedItem.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="text-white font-medium text-shadow">{selectedItem.author}</span>
                      <div className="text-white/70 text-sm">
                        {selectedItem.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsViewerOpen(false)}
                    className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-lg font-semibold mb-2 text-shadow">
                  {selectedItem.title}
                </h3>
                <p className="text-white/80 text-sm text-shadow mb-3">
                  {selectedItem.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    {selectedItem.type === 'story' ? (
                      <span>{selectedItem.views} views</span>
                    ) : (
                      <>
                        <span>{selectedItem.likes} likes</span>
                        <span>{selectedItem.comments} comments</span>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShareItem(selectedItem)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Share size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleRemoveFromFavorites(selectedItem.id)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/50 transition-colors"
                    >
                      <Heart size={16} className="text-white fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Favorites