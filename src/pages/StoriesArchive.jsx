import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, Filter, Grid, List, Heart, Share, Trash2, Play, Calendar, Star } from 'lucide-react'
import { toast } from 'react-toastify'

const StoriesArchive = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [filterBy, setFilterBy] = useState('all') // all, favorites, recent
  const [selectedStory, setSelectedStory] = useState(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock archived stories data
  const [archivedStories, setArchivedStories] = useState([
    {
      id: 1,
      title: 'Beach Day Adventure',
      thumbnail: 'https://images.unsplash.com/photo-1506905925473-2c1f2e3e74e6?w=300&h=400&fit=crop',
      type: 'image',
      duration: 10,
      createdAt: new Date('2024-01-15'),
      isFavorite: true,
      views: 45,
      description: 'Perfect sunset at the beach with friends'
    },
    {
      id: 2,
      title: 'City Night Lights',
      thumbnail: 'https://images.unsplash.com/photo-1516985080664-3a590d9ca1a6?w=300&h=400&fit=crop',
      type: 'video',
      duration: 15,
      createdAt: new Date('2024-01-12'),
      isFavorite: false,
      views: 32,
      description: 'Amazing city skyline after dark'
    },
    {
      id: 3,
      title: 'Morning Coffee',
      thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=400&fit=crop',
      type: 'image',
      duration: 8,
      createdAt: new Date('2024-01-10'),
      isFavorite: true,
      views: 28,
      description: 'Perfect start to the day'
    },
    {
      id: 4,
      title: 'Weekend Hiking',
      thumbnail: 'https://images.unsplash.com/photo-1506905925473-2c1f2e3e74e6?w=300&h=400&fit=crop',
      type: 'video',
      duration: 20,
      createdAt: new Date('2024-01-08'),
      isFavorite: false,
      views: 67,
      description: 'Trail adventure in the mountains'
    },
    {
      id: 5,
      title: 'Food Festival',
      thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop',
      type: 'image',
      duration: 12,
      createdAt: new Date('2024-01-05'),
      isFavorite: true,
      views: 89,
      description: 'Delicious street food discoveries'
    },
    {
      id: 6,
      title: 'Concert Night',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop',
      type: 'video',
      duration: 25,
      createdAt: new Date('2024-01-02'),
      isFavorite: false,
      views: 156,
      description: 'Live music under the stars'
    }
  ])

  useEffect(() => {
    // Simulate loading archived stories
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter stories based on search and filter criteria
  const filteredStories = archivedStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (filterBy) {
      case 'favorites':
        return matchesSearch && story.isFavorite
      case 'recent':
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return matchesSearch && story.createdAt >= weekAgo
      default:
        return matchesSearch
    }
  })

  const handleStoryClick = (story) => {
    setSelectedStory(story)
    setIsViewerOpen(true)
    toast.info(`Playing: ${story.title}`, {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const handleToggleFavorite = (storyId) => {
    setArchivedStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, isFavorite: !story.isFavorite }
        : story
    ))
    const story = archivedStories.find(s => s.id === storyId)
    toast.success(`${story?.isFavorite ? 'Removed from' : 'Added to'} favorites!`, {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const handleDeleteStory = (storyId) => {
    const story = archivedStories.find(s => s.id === storyId)
    if (window.confirm(`Are you sure you want to delete "${story?.title}"? This action cannot be undone.`)) {
      setArchivedStories(prev => prev.filter(story => story.id !== storyId))
      toast.success('Story deleted successfully!', {
        icon: false,
        className: 'bg-black border border-secondary/30'
      })
    }
  }

  const handleShareStory = (story) => {
    // Simulate sharing functionality
    navigator.clipboard?.writeText(`Check out my story: ${story.title}`)
    toast.success('Story link copied to clipboard!', {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const StoryCard = ({ story, isGridView }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card overflow-hidden cursor-pointer group ${
        isGridView ? 'aspect-[3/4]' : 'flex items-center p-4'
      }`}
      onClick={() => handleStoryClick(story)}
    >
      {isGridView ? (
        <div className="relative h-full">
          <img
            src={story.thumbnail}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Story Type Indicator */}
          <div className="absolute top-3 left-3">
            {story.type === 'video' ? (
              <Play size={16} className="text-white" />
            ) : (
              <Calendar size={16} className="text-white" />
            )}
          </div>

          {/* Favorite Indicator */}
          {story.isFavorite && (
            <div className="absolute top-3 right-3">
              <Heart size={16} className="text-primary fill-current" />
            </div>
          )}

          {/* Story Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-semibold text-sm mb-1">{story.title}</h3>
            <p className="text-white/80 text-xs mb-2">{story.description}</p>
            <div className="flex items-center justify-between text-white/60 text-xs">
              <span>{story.createdAt.toLocaleDateString()}</span>
              <span>{story.views} views</span>
            </div>
          </div>

          {/* Action Buttons (visible on hover) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleFavorite(story.id)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Heart size={16} className={`text-white ${story.isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShareStory(story)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Share size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteStory(story.id)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/50 transition-colors"
              >
                <Trash2 size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 w-full">
          <img
            src={story.thumbnail}
            alt={story.title}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800">{story.title}</h3>
              {story.isFavorite && <Star size={14} className="text-primary fill-current" />}
            </div>
            <p className="text-gray-600 text-sm mb-2">{story.description}</p>
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span>{story.createdAt.toLocaleDateString()}</span>
              <span>{story.views} views</span>
              <span>{story.duration}s</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggleFavorite(story.id)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Heart size={14} className={`text-gray-600 ${story.isFavorite ? 'fill-current text-primary' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleShareStory(story)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Share size={14} className="text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteStory(story.id)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <Trash2 size={14} className="text-gray-600" />
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
            <h1 className="text-3xl font-bold text-gray-900">My Stories Archive</h1>
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
                placeholder="Search your stories..."
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
                <option value="all">All Stories</option>
                <option value="favorites">Favorites</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stories Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredStories.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
              : 'space-y-4'
          }>
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} isGridView={viewMode === 'grid'} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No stories found' : 'No archived stories yet'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No stories match "${searchQuery}"`
                : 'Your archived stories will appear here'
              }
            </p>
          </div>
        )}

        {/* Story Count */}
        {!isLoading && filteredStories.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Showing {filteredStories.length} of {archivedStories.length} stories
          </div>
        )}
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setIsViewerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedStory.thumbnail}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              
              {/* Header */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="text-white font-medium text-shadow">You</span>
                      <div className="text-white/70 text-sm">
                        {selectedStory.createdAt.toLocaleDateString()}
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
                
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: selectedStory.duration, ease: "linear" }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>

              {/* Story Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-semibold mb-2 text-shadow">
                  {selectedStory.title}
                </h3>
                <p className="text-white/80 text-sm text-shadow">
                  {selectedStory.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-20 right-4 flex flex-col gap-3">
                <button
                  onClick={() => handleToggleFavorite(selectedStory.id)}
                  className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Heart 
                    size={20} 
                    className={`text-white ${selectedStory.isFavorite ? 'fill-current text-primary' : ''}`} 
                  />
                </button>
                <button
                  onClick={() => handleShareStory(selectedStory)}
                  className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Share size={20} className="text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StoriesArchive