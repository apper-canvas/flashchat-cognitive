import memoriesData from '../mockData/memories.json'

// Utility function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage (simulating database)
let memories = [...memoriesData]

const memoriesService = {
  // Get all memories
  async getAll() {
    await delay(300)
    return [...memories].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  },

  // Get memory by ID
  async getById(id) {
    await delay(200)
    const memory = memories.find(m => m.id === id)
    if (!memory) {
      throw new Error('Memory not found')
    }
    return { ...memory }
  },

  // Create new memory
  async create(memoryData) {
    await delay(400)
    const newMemory = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...memoryData
    }
    memories.unshift(newMemory)
    return { ...newMemory }
  },

  // Update memory
  async update(id, updates) {
    await delay(350)
    const index = memories.findIndex(m => m.id === id)
    if (index === -1) {
      throw new Error('Memory not found')
    }
    memories[index] = { ...memories[index], ...updates }
    return { ...memories[index] }
  },

  // Delete memory
  async delete(id) {
    await delay(250)
    const index = memories.findIndex(m => m.id === id)
    if (index === -1) {
      throw new Error('Memory not found')
    }
    const deletedMemory = memories.splice(index, 1)[0]
    return { ...deletedMemory }
  },

  // Search memories
  async search(query) {
    await delay(200)
    const lowerQuery = query.toLowerCase()
    return memories.filter(memory => 
      memory.title?.toLowerCase().includes(lowerQuery) ||
      memory.location?.toLowerCase().includes(lowerQuery) ||
      memory.filter?.name?.toLowerCase().includes(lowerQuery)
    )
  }
}

export default memoriesService