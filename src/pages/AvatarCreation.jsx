import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Palette, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SketchPicker } from 'react-color';
import { avatarService } from '../services/api/avatarService';

const AvatarCreation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(null);
  
  const [avatar, setAvatar] = useState({
    name: '',
    hairStyle: 'short',
    hairColor: '#8B4513',
    eyeColor: '#4B0082',
    skinTone: '#F5DEB3',
    clothesColor: '#FF6B6B',
    accessories: 'none'
  });

  const hairStyles = [
    { value: 'short', label: 'Short' },
    { value: 'long', label: 'Long' },
    { value: 'curly', label: 'Curly' },
    { value: 'wavy', label: 'Wavy' },
    { value: 'buzz', label: 'Buzz Cut' },
    { value: 'ponytail', label: 'Ponytail' },
    { value: 'braids', label: 'Braids' },
    { value: 'mohawk', label: 'Mohawk' },
    { value: 'bob', label: 'Bob' },
    { value: 'undercut', label: 'Undercut' },
    { value: 'afro', label: 'Afro' },
    { value: 'pixie', label: 'Pixie' }
  ];

  const accessories = [
    { value: 'none', label: 'None' },
    { value: 'glasses', label: 'Glasses' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'hat', label: 'Hat' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'piercing', label: 'Piercing' }
  ];

  const handleSave = async () => {
    if (!avatar.name.trim()) {
      toast.error('Please enter a name for your avatar');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await avatarService.create(avatar);
      toast.success('Avatar created successfully!');
      navigate('/');
    } catch (err) {
      setError('Failed to save avatar');
      toast.error('Failed to save avatar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (colorType, color) => {
    setAvatar(prev => ({
      ...prev,
      [colorType]: color.hex
    }));
  };

  const renderColorPicker = (colorType, currentColor) => {
    if (showColorPicker !== colorType) return null;

    return (
      <div className="absolute top-full left-0 z-50 mt-2">
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowColorPicker(null)}
        />
        <div className="relative z-50">
          <SketchPicker
            color={currentColor}
            onChange={(color) => handleColorChange(colorType, color)}
          />
        </div>
      </div>
    );
  };

  const renderAvatarPreview = () => (
    <div className="w-64 h-64 mx-auto mb-8">
      <svg viewBox="0 0 200 200" className="w-full h-full avatar-preview">
        {/* Face */}
        <circle cx="100" cy="100" r="80" fill={avatar.skinTone} />
        
        {/* Hair */}
        {avatar.hairStyle === 'short' && (
          <path 
            d="M30 80 Q100 20 170 80 L160 70 Q100 30 40 70 Z" 
            fill={avatar.hairColor} 
          />
        )}
        {avatar.hairStyle === 'long' && (
          <path 
            d="M20 70 Q100 10 180 70 L180 140 Q100 160 20 140 Z" 
            fill={avatar.hairColor} 
          />
        )}
        {avatar.hairStyle === 'curly' && (
          <>
            <circle cx="60" cy="60" r="20" fill={avatar.hairColor} />
            <circle cx="100" cy="50" r="25" fill={avatar.hairColor} />
            <circle cx="140" cy="60" r="20" fill={avatar.hairColor} />
            <circle cx="80" cy="40" r="15" fill={avatar.hairColor} />
            <circle cx="120" cy="40" r="15" fill={avatar.hairColor} />
          </>
        )}
        {avatar.hairStyle === 'buzz' && (
          <path 
            d="M40 85 Q100 25 160 85 L150 80 Q100 35 50 80 Z" 
            fill={avatar.hairColor} 
          />
        )}
        {avatar.hairStyle === 'ponytail' && (
          <>
            <path 
              d="M30 80 Q100 20 170 80 L160 70 Q100 30 40 70 Z" 
              fill={avatar.hairColor} 
            />
            <ellipse cx="170" cy="100" rx="15" ry="40" fill={avatar.hairColor} />
          </>
        )}

        {/* Eyes */}
        <circle cx="75" cy="85" r="8" fill="white" />
        <circle cx="125" cy="85" r="8" fill="white" />
        <circle cx="75" cy="85" r="5" fill={avatar.eyeColor} />
        <circle cx="125" cy="85" r="5" fill={avatar.eyeColor} />
        <circle cx="75" cy="83" r="2" fill="black" />
        <circle cx="125" cy="83" r="2" fill="black" />

        {/* Nose */}
        <ellipse cx="100" cy="100" rx="3" ry="6" fill={avatar.skinTone} stroke="#ddd" strokeWidth="1" />

        {/* Mouth */}
        <path d="M85 115 Q100 125 115 115" stroke="#333" strokeWidth="2" fill="none" />

        {/* Clothes */}
        <rect x="60" y="160" width="80" height="40" fill={avatar.clothesColor} rx="10" />

        {/* Accessories */}
        {avatar.accessories === 'glasses' && (
          <>
            <circle cx="75" cy="85" r="12" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="125" cy="85" r="12" fill="none" stroke="#333" strokeWidth="2" />
            <line x1="87" y1="85" x2="113" y2="85" stroke="#333" strokeWidth="2" />
          </>
        )}
        {avatar.accessories === 'hat' && (
          <ellipse cx="100" cy="40" rx="60" ry="15" fill="#4A4A4A" />
        )}
        {avatar.accessories === 'earrings' && (
          <>
            <circle cx="55" cy="95" r="4" fill="#FFD700" />
            <circle cx="145" cy="95" r="4" fill="#FFD700" />
          </>
        )}
        {avatar.accessories === 'necklace' && (
          <ellipse cx="100" cy="150" rx="20" ry="8" fill="none" stroke="#FFD700" strokeWidth="3" />
        )}
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
          
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User size={28} />
            Create Avatar
          </h1>
          
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 
                     text-white px-6 py-2 rounded-full hover:shadow-lg transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="avatar-card text-center"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Preview</h2>
            {renderAvatarPreview()}
            
            <input
              type="text"
              placeholder="Enter avatar name..."
              value={avatar.name}
              onChange={(e) => setAvatar(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60
                       border border-white/20 focus:border-white/50 focus:outline-none"
            />
          </motion.div>

          {/* Customization Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Hair Style */}
            <div className="avatar-card">
              <h3 className="text-lg font-medium text-white mb-4">Hair Style</h3>
              <div className="grid grid-cols-3 gap-2">
                {hairStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setAvatar(prev => ({ ...prev, hairStyle: style.value }))}
                    className={`p-2 rounded-lg text-sm transition-all ${
                      avatar.hairStyle === style.value
                        ? 'bg-yellow-400 text-black font-semibold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Customization */}
            <div className="avatar-card">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Palette size={20} />
                Colors
              </h3>
              
              <div className="space-y-4">
                {[
                  { key: 'hairColor', label: 'Hair Color' },
                  { key: 'eyeColor', label: 'Eye Color' },
                  { key: 'skinTone', label: 'Skin Tone' },
                  { key: 'clothesColor', label: 'Clothes Color' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-white">{label}</span>
                    <div className="relative">
                      <button
                        onClick={() => setShowColorPicker(showColorPicker === key ? null : key)}
                        className="w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/60 transition-all"
                        style={{ backgroundColor: avatar[key] }}
                      />
                      {renderColorPicker(key, avatar[key])}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="avatar-card">
              <h3 className="text-lg font-medium text-white mb-4">Accessories</h3>
              <div className="grid grid-cols-2 gap-2">
                {accessories.map((accessory) => (
                  <button
                    key={accessory.value}
                    onClick={() => setAvatar(prev => ({ ...prev, accessories: accessory.value }))}
                    className={`p-2 rounded-lg text-sm transition-all ${
                      avatar.accessories === accessory.value
                        ? 'bg-yellow-400 text-black font-semibold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {accessory.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-center"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AvatarCreation;