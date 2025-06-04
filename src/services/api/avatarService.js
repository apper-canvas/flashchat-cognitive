import avatarsData from '../mockData/avatars.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let avatars = [...avatarsData];

export const avatarService = {
  async getAll() {
    await delay(300);
    return [...avatars];
  },

  async getById(id) {
    await delay(250);
    const avatar = avatars.find(a => a.id === id);
    if (!avatar) {
      throw new Error('Avatar not found');
    }
    return { ...avatar };
  },

  async create(avatarData) {
    await delay(400);
    const newAvatar = {
      id: Date.now().toString(),
      ...avatarData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    avatars.push(newAvatar);
    return { ...newAvatar };
  },

  async update(id, avatarData) {
    await delay(350);
    const index = avatars.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Avatar not found');
    }
    const updatedAvatar = {
      ...avatars[index],
      ...avatarData,
      updatedAt: new Date().toISOString()
    };
    avatars[index] = updatedAvatar;
    return { ...updatedAvatar };
  },

  async delete(id) {
    await delay(300);
    const index = avatars.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Avatar not found');
    }
    const deletedAvatar = { ...avatars[index] };
    avatars.splice(index, 1);
    return deletedAvatar;
  }
};