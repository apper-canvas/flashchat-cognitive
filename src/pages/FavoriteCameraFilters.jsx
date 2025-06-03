import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, Filter, Grid, List, Heart, Share, Eye, Calendar, Star, Camera, Download, Sparkles, Palette, Sun, Moon } from 'lucide-react'
import { toast } from 'react-toastify'

const FavoriteCameraFilters = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [filterBy, setFilterBy] = useState('all') // all, vintage, modern, artistic, bw, color, special
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock favorite camera filters data
  const [favoriteFilters, setFavoriteFilters] = useState([
    {
      id: 1,
      name: 'Vintage Glow',
      category: 'vintage',
      description: 'Warm vintage tones with a soft glow effect',
      preview: 'https://images.unsplash.com/photo-1506905925473-2c1f2e3e74e6?w=400&h=400&fit=crop&filt=sepia',
      intensity: 85,
      popularityScore: 4.8,
      downloads: 2140,
      dateAdded: new Date('2024-01-15'),
      isFavorite: true,
      tags: ['warm', 'golden', 'nostalgic', 'soft'],
      author: 'FilterMaster Pro'
    },
    {
      id: 2,
      name: 'Neon Nights',
      category: 'modern',
      description: 'Cyberpunk inspired with enhanced neon colors',
      preview: 'https://images.unsplash.com/photo-1516985080664-3a590d9ca1a6?w=400&h=400&fit=crop&sat=2',
      intensity: 92,
      popularityScore: 4.6,
      downloads: 1876,
      dateAdded: new Date('2024-01-12'),
      isFavorite: true,
      tags: ['neon', 'cyberpunk', 'electric', 'vibrant'],
      author: 'UrbanLens Studio'
    },
    {
      id: 3,
      name: 'Classic B&W',
      category: 'bw',
      description: 'Timeless black and white with perfect contrast',
      preview: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop&sat=-100',
      intensity: 100,
      popularityScore: 4.9,
      downloads: 3245,
      dateAdded: new Date('2024-01-10'),
      isFavorite: true,
      tags: ['monochrome', 'classic', 'dramatic', 'timeless'],
      author: 'Classic Shots'
    },
    {
      id: 4,
      name: 'Sunset Bloom',
      category: 'color',
      description: 'Enhanced warm colors with bloom effect',
      preview: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop&filt=warm',
      intensity: 78,
      popularityScore: 4.7,
      downloads: 1923,
      dateAdded: new Date('2024-01-08'),
      isFavorite: true,
      tags: ['sunset', 'warm', 'romantic', 'golden hour'],
      author: 'Nature Focus'
    },
    {
      id: 5,
      name: 'Dreamy Soft',
      category: 'artistic',
      description: 'Soft focus with dreamy pastel tones',
      preview: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop&blur=1',
      intensity: 65,
      popularityScore: 4.4,
      downloads: 1567,
      dateAdded: new Date('2024-01-05'),
      isFavorite: true,
      tags: ['dreamy', 'soft', 'pastel', 'ethereal'],
      author: 'ArtisticVision'
    },
    {
      id: 6,
      name: 'Film Grain',
      category: 'vintage',
      description: 'Authentic film grain with vintage color grading',
      preview: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop&filt=vintage',
      intensity: 88,
      popularityScore: 4.5,
      downloads: 2089,
      dateAdded: new Date('2024-01-02'),
      isFavorite: true,
      tags: ['film', 'grain', 'analog', 'retro'],
      author: 'RetroLens Co'
    },
    {
      id: 7,
      name: 'Arctic Blue',
      category: 'color',
      description: 'Cool blue tones with enhanced clarity',
      preview: 'https://images.unsplash.com/photo-1506905925473-2c1f2e3e74e6?w=400&h=400&fit=crop&filt=cool',
      intensity: 82,
      popularityScore: 4.3,
      downloads: 1432,
      dateAdded: new Date('2023-12-28'),
      isFavorite: true,
      tags: ['cool', 'blue', 'crisp', 'winter'],
      author: 'FrostBite Filters'
    },
    {
      id: 8,
      name: 'Holographic',
      category: 'special',
      description: 'Iridescent rainbow effect with light leaks',
      preview: 'https://images.unsplash.com/photo-1494790108755-2616b612b798?w=400&h=400&fit=crop&rainbow=1',
      intensity: 95,
      popularityScore: 4.2,
      downloads: 1876,
      dateAdded: new Date('2023-12-25'),
      isFavorite: true,
      tags: ['holographic', 'rainbow', 'futuristic', 'prismatic'],
      author: 'Spectrum Labs'
    }
  ])

  useEffect(() => {
    // Simulate loading favorite filters
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter favorites based on search and filter criteria
  const filteredFavorites = favoriteFilters.filter(filter => {
    const matchesSearch = filter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         filter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         filter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         filter.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (filterBy) {
      case 'vintage':
        return matchesSearch && filter.category === 'vintage'
      case 'modern':
        return matchesSearch && filter.category === 'modern'
      case 'artistic':
        return matchesSearch && filter.category === 'artistic'
      case 'bw':
        return matchesSearch && filter.category === 'bw'
      case 'color':
        return matchesSearch && filter.category === 'color'
      case 'special':
        return matchesSearch && filter.category === 'special'
      default:
        return matchesSearch
    }
  })

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter)
    setIsViewerOpen(true)
    toast.info(`Viewing filter: ${filter.name}`, {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const handleApplyFilter = (filter) => {
    toast.success(`${filter.name} filter applied!`, {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const handleRemoveFromFavorites = (filterId) => {
    const filter = favoriteFilters.find(f => f.id === filterId)
    if (window.confirm(`Remove "${filter?.name}" from favorites?`)) {
      setFavoriteFilters(prev => prev.filter(fav => fav.id !== filterId))
      setIsViewerOpen(false)
      toast.success('Removed from favorites!', {
        icon: false,
        className: 'bg-black border border-secondary/30'
      })
    }
  }

  const handleShareFilter = (filter) => {
    navigator.clipboard?.writeText(`Check out this amazing camera filter: ${filter.name} - ${filter.description}`)
    toast.success('Filter link copied to clipboard!', {
      icon: false,
      className: 'bg-black border border-primary/30'
    })
  }

  const handleDownloadFilter = (filter) => {
    toast.success(`Downloading ${filter.name} filter...`, {
      icon: false,
      className: 'bg-black border border-green-500/30'
    })
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'vintage':
        return <Camera size={16} className="text-amber-500" />
      case 'modern':
        return <Sparkles size={16} className="text-blue-500" />
      case 'artistic':
        return <Palette size={16} className="text-purple-500" />
      case 'bw':
        return <Moon size={16} className="text-gray-500" />
      case 'color':
        return <Sun size={16} className="text-orange-500" />
      case 'special':
        return <Star size={16} className="text-pink-500" />
      default:
        return <Filter size={16} className="text-primary" />
    }
  }

  const getCategoryName = (category) => {
    switch (category) {
      case 'vintage': return 'Vintage'
      case 'modern': return 'Modern'
      case 'artistic': return 'Artistic'
      case 'bw': return 'Black & White'
      case 'color': return 'Color Enhancement'
      case 'special': return 'Special Effects'
      default: return 'Filter'
    }
  }

  const FilterCard = ({ filter, isGridView }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card overflow-hidden cursor-pointer group ${
        isGridView ? 'aspect-square' : 'flex items-center p-4'
      }`}
      onClick={() => handleFilterClick(filter)}
    >
      {isGridView ? (
        <div className="relative h-full">
          <img
            src={filter.preview}
            alt={filter.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Indicator */}
          <div className="absolute top-3 left-3">
            {getCategoryIcon(filter.category)}
          </div>

          {/* Favorite Indicator */}
          <div className="absolute top-3 right-3">
            <Heart size={16} className="text-primary fill-current" />
          </div>

          {/* Filter Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-semibold text-sm mb-1">{filter.name}</h3>
            <p className="text-white/80 text-xs line-clamp-2 mb-2">{filter.description}</p>
            <div className="flex items-center justify-between text-white/60 text-xs">
              <span>{getCategoryName(filter.category)}</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-primary fill-current" />
                <span>{filter.popularityScore}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons (visible on hover) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleApplyFilter(filter)
                }}
                className="w-10 h-10 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Camera size={16} className="text-black" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShareFilter(filter)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Share size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleFilterClick(filter)
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Eye size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 w-full">
          <div className="relative">
            <img
              src={filter.preview}
              alt={filter.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="absolute top-1 left-1">
              {getCategoryIcon(filter.category)}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800">{filter.name}</h3>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {getCategoryName(filter.category)}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{filter.description}</p>
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span>by {filter.author}</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-primary fill-current" />
                <span>{filter.popularityScore}</span>
              </div>
              <span>{filter.downloads} downloads</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleApplyFilter(filter)
              }}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
            >
              <Camera size={14} className="text-black" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleShareFilter(filter)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Share size={14} className="text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleFilterClick(filter)
              }}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Eye size={14} className="text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFromFavorites(filter.id)
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Favorite Camera Filters</h1>
              <p className="text-gray-600 mt-1">Your collection of amazing camera filters</p>
            </div>
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
                placeholder="Search camera filters..."
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
                <option value="all">All Categories</option>
                <option value="vintage">Vintage</option>
                <option value="modern">Modern</option>
                <option value="artistic">Artistic</option>
                <option value="bw">Black & White</option>
                <option value="color">Color Enhancement</option>
                <option value="special">Special Effects</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters Grid/List */}
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
            {filteredFavorites.map(filter => (
              <FilterCard key={filter.id} filter={filter} isGridView={viewMode === 'grid'} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Camera size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No filters found' : 'No favorite filters yet'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No filters match "${searchQuery}"`
                : 'Start favoriting camera filters to see them here'
              }
            </p>
          </div>
        )}

        {/* Filters Count */}
        {!isLoading && filteredFavorites.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Showing {filteredFavorites.length} of {favoriteFilters.length} favorite filters
          </div>
        )}
      </div>

      {/* Filter Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && selectedFilter && (
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
                src={selectedFilter.preview}
                alt={selectedFilter.name}
                className="w-full aspect-square object-cover"
              />
              
              {/* Header */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(selectedFilter.category)}
                    <span className="text-white font-medium text-shadow">
                      {getCategoryName(selectedFilter.category)}
                    </span>
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
                <h3 className="text-white text-lg font-semibold mb-1 text-shadow">
                  {selectedFilter.name}
                </h3>
                <p className="text-white/80 text-sm text-shadow mb-2">
                  {selectedFilter.description}
                </p>
                <div className="flex items-center justify-between text-white/70 text-sm mb-3">
                  <span>by {selectedFilter.author}</span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-primary fill-current" />
                    <span>{selectedFilter.popularityScore}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApplyFilter(selectedFilter)}
                    className="flex-1 bg-primary text-black py-2 px-4 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                  >
                    Apply Filter
                  </button>
                  <button
                    onClick={() => handleDownloadFilter(selectedFilter)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Download size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => handleShareFilter(selectedFilter)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Share size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => handleRemoveFromFavorites(selectedFilter.id)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-red-500/50 transition-colors"
                  >
                    <Heart size={16} className="text-white fill-current" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FavoriteCameraFilters