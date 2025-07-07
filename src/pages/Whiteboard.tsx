
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette, Save, Share, Users } from 'lucide-react';
import { Canvas } from '@/components/whiteboard/Canvas';
import { Toolbar } from '@/components/whiteboard/Toolbar';
import { ColorPicker } from '@/components/whiteboard/ColorPicker';
import { OrganizationSwitcher } from '@/components/organizations/OrganizationSwitcher';
import { useOrganization } from '@/hooks/useOrganization';
import { useWhiteboardData } from '@/hooks/useWhiteboardData';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Whiteboard = Tables<'whiteboards'>;

const Whiteboard = () => {
  const navigate = useNavigate();
  const { id: whiteboardId } = useParams<{ id: string }>();
  const { organizationName } = useOrganization();
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle">("select");
  const [activeColor, setActiveColor] = useState("#000000");
  const [whiteboard, setWhiteboard] = useState<Whiteboard | null>(null);
  const [collaborators, setCollaborators] = useState<number>(1);
  
  const { canvasData, loading, saveCanvasData } = useWhiteboardData(whiteboardId || '');

  useEffect(() => {
    if (!whiteboardId) return;

    const fetchWhiteboard = async () => {
      try {
        const { data, error } = await supabase
          .from('whiteboards')
          .select('*')
          .eq('id', whiteboardId)
          .single();

        if (error) throw error;
        setWhiteboard(data);
      } catch (error) {
        console.error('Error fetching whiteboard:', error);
        toast.error('Failed to load whiteboard');
        navigate('/dashboard');
      }
    };

    fetchWhiteboard();
  }, [whiteboardId, navigate]);

  // Set up presence tracking for real-time collaboration
  useEffect(() => {
    if (!whiteboardId) return;

    const channel = supabase.channel(`whiteboard_presence_${whiteboardId}`);

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const userCount = Object.keys(newState).length;
        setCollaborators(userCount);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: `user_${Date.now()}`,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [whiteboardId]);

  const handleClear = () => {
    // This will be handled by the Canvas component
  };

  const handleSave = () => {
    if (canvasData) {
      saveCanvasData(canvasData);
      toast.success('Whiteboard saved successfully');
    }
  };

  const handleShare = () => {
    if (whiteboardId) {
      navigator.clipboard.writeText(`${window.location.origin}/whiteboard/${whiteboardId}`);
      toast.success('Whiteboard link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <p className="text-neutral-400">Loading whiteboard...</p>
        </div>
      </div>
    );
  }

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
              <span className="text-xl font-bold text-neutral-100">
                {whiteboard?.title || 'Untitled Board'}
              </span>
              <span className="text-sm text-neutral-400">• {organizationName}</span>
              {collaborators > 1 && (
                <div className="flex items-center gap-1 text-sm text-neutral-400">
                  <Users className="w-4 h-4" />
                  {collaborators} users
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <OrganizationSwitcher />
            <Button variant="outline" size="sm" className="text-neutral-300 border-neutral-700" onClick={handleShare}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
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
            <Canvas 
              activeTool={activeTool} 
              activeColor={activeColor} 
              whiteboardId={whiteboardId}
              initialData={canvasData}
              onDataChange={saveCanvasData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Whiteboard;
