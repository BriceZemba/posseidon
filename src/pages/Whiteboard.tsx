
import { UserButton, useUser } from '@clerk/clerk-react';
import { Palette } from 'lucide-react';
import { Canvas } from '@/components/whiteboard/Canvas';
import { Toolbar } from '@/components/whiteboard/Toolbar';
import { ColorPicker } from '@/components/whiteboard/ColorPicker';
import { useState } from 'react';

const Whiteboard = () => {
  const { user } = useUser();
  const [activeColor, setActiveColor] = useState('#000000');
  const [activeTool, setActiveTool] = useState<'select' | 'draw' | 'rectangle' | 'circle' | 'arrow'>('select');
  const [brushSize, setBrushSize] = useState(2);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-100">DrawBoard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-neutral-300">Welcome, {user?.firstName || 'User'}!</span>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              }
            }} />
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center gap-6">
          <Toolbar 
            activeTool={activeTool} 
            onToolClick={setActiveTool}
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
          />
          <ColorPicker color={activeColor} onChange={setActiveColor} />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-6">
        <Canvas 
          activeColor={activeColor}
          activeTool={activeTool}
          brushSize={brushSize}
        />
      </div>
    </div>
  );
};

export default Whiteboard;
