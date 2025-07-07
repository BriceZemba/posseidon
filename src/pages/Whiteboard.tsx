
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette, Square, Circle, Type } from 'lucide-react';

const Whiteboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-neutral-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-100">Untitled Board</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-neutral-300 border-neutral-700">
              Share
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b border-neutral-800 bg-neutral-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-2">
            <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white">
              <Square className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white">
              <Circle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white">
              <Type className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white">
              <Palette className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg" style={{ height: '600px' }}>
            <div className="flex items-center justify-center h-full text-neutral-500">
              <div className="text-center">
                <Palette className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
                <p className="text-lg">Your canvas is ready!</p>
                <p className="text-sm">Whiteboard functionality coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Whiteboard;
