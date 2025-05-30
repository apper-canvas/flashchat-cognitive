import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, UserPlus, Check, X, Users, Phone, Mail } from 'lucide-react'
import { toast } from 'react-toastify'

const AddFriends = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [sentRequests, setSentRequests] = useState(new Set())
  const [activeTab, setActiveTab] = useState('suggestions')

  // Mock friend suggestions data
  const [friendSuggestions] = useState([
    {
      id: 1,
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d3?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 12,
      category: 'mutual',
      isOnline: true
    },
    {
      id: 2,
      name: 'James Rodriguez',
      username: '@jamesrod',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 8,
      category: 'mutual',
      isOnline: false
    },
    {
      id: 3,
      name: 'Sarah Chen',
      username: '@sarahc',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 0,
      category: 'contacts',
      isOnline: true
    },
    {
      id: 4,
      name: 'Michael Torres',
      username: '@miketorres',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 5,
      category: 'suggested',
      isOnline: true
    },
    {
      id: 5,
      name: 'Lisa Parker',
      username: '@lisap',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 3,
      category: 'suggested',
      isOnline: false
    },
    {
      id: 6,
      name: 'David Kim',
      username: '@davidk',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 0,
      category: 'contacts',
      isOnline: true
    }
  ])

  // Filter suggestions by category
  const mutualFriends = friendSuggestions.filter(friend => friend.category === 'mutual')
  const fromContacts = friendSuggestions.filter(friend => friend.category === 'contacts')
  const suggested = friendSuggestions.filter(friend => friend.category === 'suggested')

  // Search functionality
  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      
      // Simulate API search with delay
      setTimeout(() => {
        const results = friendSuggestions.filter(friend =>
          friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          friend.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 500)
    }

    searchUsers()
  }, [searchQuery, friendSuggestions])

  const handleSendRequest = (friendId, friendName) => {
    setSentRequests(prev => new Set([...prev, friendId]))
    toast.success(`Friend request sent to ${friendName}!`)
  }

  const handleCancelRequest = (friendId, friendName) => {
    setSentRequests(prev => {
      const newSet = new Set(prev)
      newSet.delete(friendId)
      return newSet
    })
    toast.info(`Friend request to ${friendName} cancelled`)
  }

  const FriendCard = ({ friend }) => {
    const isRequestSent = sentRequests.has(friend.id)

    return (
      <motion.div
        className="glass-card p-4 hover:bg-white/10 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {friend.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{friend.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{friend.username}</p>
              {friend.mutualFriends > 0 && (
                <p className="text-xs text-primary flex items-center gap-1">
                  <Users size={12} />
                  {friend.mutualFriends} mutual friends
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {isRequestSent ? (
              <button
                onClick={() => handleCancelRequest(friend.id, friend.name)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Check size={16} />
                Sent
              </button>
            ) : (
              <button
                onClick={() => handleSendRequest(friend.id, friend.name)}
                className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <UserPlus size={16} />
                Add Friend
              </button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  const SectionHeader = ({ title, icon: Icon, count }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        {count > 0 && (
          <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-white to-secondary/20 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 glass-card hover:bg-white/20 transition-colors rounded-lg"
            >
              <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Friends</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-card p-6 mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, username, or phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="glass-card p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Search Results</h2>
            {isSearching ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map(friend => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                No users found matching "{searchQuery}"
              </div>
            )}
          </div>
        )}

        {/* Friend Suggestions */}
        {!searchQuery && (
          <div className="space-y-8">
            {/* Mutual Friends */}
            {mutualFriends.length > 0 && (
              <div className="glass-card p-6">
                <SectionHeader title="People you may know" icon={Users} count={mutualFriends.length} />
                <div className="space-y-3">
                  {mutualFriends.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                  ))}
                </div>
              </div>
            )}

            {/* From Contacts */}
            {fromContacts.length > 0 && (
              <div className="glass-card p-6">
                <SectionHeader title="From your contacts" icon={Phone} count={fromContacts.length} />
                <div className="space-y-3">
                  {fromContacts.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested */}
            {suggested.length > 0 && (
              <div className="glass-card p-6">
                <SectionHeader title="Suggested for you" icon={Mail} count={suggested.length} />
                <div className="space-y-3">
                  {suggested.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && friendSuggestions.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Users size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No suggestions available</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We'll show friend suggestions here when they become available.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddFriends