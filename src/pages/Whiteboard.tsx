
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette } from 'lucide-react';
import { Canvas } from '@/components/whiteboard/Canvas';
import { Toolbar } from '@/components/whiteboard/Toolbar';
import { ColorPicker } from '@/components/whiteboard/ColorPicker';
import { OrganizationSwitcher } from '@/components/organizations/OrganizationSwitcher';
import { useOrganization } from '@/hooks/useOrganization';

const Whiteboard = () => {
  const navigate = useNavigate();
  const { organizationName } = useOrganization();
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle">("select");
  const [activeColor, setActiveColor] = useState("#000000");

  const handleClear = () => {
    // This will be handled by the Canvas component
  };

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
              <span className="text-sm text-neutral-400">• {organizationName}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <OrganizationSwitcher />
            <Button variant="outline" size="sm" className="text-neutral-300 border-neutral-700">
              Share
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Canvas Area */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Toolbar activeTool={activeTool} onToolClick={setActiveTool} onClear={handleClear} />
              <ColorPicker color={activeColor} onChange={setActiveColor} />
            </div>
            <Canvas activeTool={activeTool} activeColor={activeColor} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Whiteboard;
