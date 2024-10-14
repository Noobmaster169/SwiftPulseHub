import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ThemeSelectorProps {
  onThemeChange: (theme: string) => void;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange, onClose }) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const themes = [
    '/background/action1.jpg',
    '/background/action2.jpg',
    '/background/ghibli1.png',
    '/background/ghibli2.jpg',
    '/background/ghibli3.jpg',
    '/background/shinkai1.jpg',
    '/background/shinkai2.jpg',
  ];

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
  };

  const handleSave = () => {
    if (selectedTheme) {
      onThemeChange(selectedTheme);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Pick your theme</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 150px)' }}>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme, index) => (
              <div 
                key={index} 
                className={`aspect-w-16 aspect-h-9 cursor-pointer hover:opacity-80 transition-opacity ${selectedTheme === theme ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleThemeSelect(theme)}
              >
                <img
                  src={theme}
                  alt={`Theme ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              My photos
            </button>
          </div>
        </div>
        
        <div className="flex justify-end items-center p-4 border-t bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium mr-2">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            disabled={!selectedTheme}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;