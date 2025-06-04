// Utility function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for editing sessions
let editingSessions = []

const photoEditingService = {
  // Create new editing session
  async createSession(photoData) {
    await delay(300)
    const session = {
      id: Date.now(),
      photoUrl: photoData.url,
      originalUrl: photoData.url,
      timestamp: new Date().toISOString(),
      edits: {
        filter: photoData.filter || { id: 'normal', name: 'Normal', css: 'none' },
        brightness: 0,
        contrast: 1,
        saturation: 1,
        blur: 0,
        music: null,
        stickers: []
      }
    }
    editingSessions.push(session)
    return { ...session }
  },

  // Update editing session
  async updateSession(sessionId, updates) {
    await delay(200)
    const index = editingSessions.findIndex(s => s.id === sessionId)
    if (index === -1) {
      throw new Error('Editing session not found')
    }
    editingSessions[index] = { 
      ...editingSessions[index], 
      ...updates,
      edits: { ...editingSessions[index].edits, ...updates.edits }
    }
    return { ...editingSessions[index] }
  },

  // Apply filter to session
  async applyFilter(sessionId, filter) {
    await delay(250)
    return this.updateSession(sessionId, {
      edits: { filter }
    })
  },

  // Apply adjustment to session
  async applyAdjustment(sessionId, adjustmentType, value) {
    await delay(200)
    const session = editingSessions.find(s => s.id === sessionId)
    if (!session) {
      throw new Error('Editing session not found')
    }
    
    return this.updateSession(sessionId, {
      edits: { [adjustmentType]: value }
    })
  },

  // Add music to session
  async addMusic(sessionId, musicTrack) {
    await delay(300)
    return this.updateSession(sessionId, {
      edits: { music: musicTrack }
    })
  },

  // Add sticker to session
  async addSticker(sessionId, sticker, position) {
    await delay(250)
    const session = editingSessions.find(s => s.id === sessionId)
    if (!session) {
      throw new Error('Editing session not found')
    }

    const newSticker = {
      id: Date.now(),
      ...sticker,
      position: position || { x: 50, y: 50 },
      size: 30
    }

    const updatedStickers = [...session.edits.stickers, newSticker]
    return this.updateSession(sessionId, {
      edits: { stickers: updatedStickers }
    })
  },

  // Remove sticker from session
  async removeSticker(sessionId, stickerId) {
    await delay(200)
    const session = editingSessions.find(s => s.id === sessionId)
    if (!session) {
      throw new Error('Editing session not found')
    }

    const updatedStickers = session.edits.stickers.filter(s => s.id !== stickerId)
    return this.updateSession(sessionId, {
      edits: { stickers: updatedStickers }
    })
  },

  // Save edited photo
  async saveEditedPhoto(sessionId, title) {
    await delay(400)
    const session = editingSessions.find(s => s.id === sessionId)
    if (!session) {
      throw new Error('Editing session not found')
    }

    // Simulate saving the edited photo
    const editedPhoto = {
      id: Date.now(),
      title: title || `Edited Photo ${new Date().toLocaleDateString()}`,
      url: session.photoUrl,
      thumbnail: session.photoUrl,
      timestamp: new Date().toISOString(),
      ...session.edits
    }

    // Clean up session
    editingSessions = editingSessions.filter(s => s.id !== sessionId)
    
    return { ...editedPhoto }
  }
}

export default photoEditingService