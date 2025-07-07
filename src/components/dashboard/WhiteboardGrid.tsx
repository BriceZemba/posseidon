
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Plus, Trash2, Calendar, User } from 'lucide-react';
import { useWhiteboards } from '@/hooks/useWhiteboards';
import { Tables } from '@/integrations/supabase/types';
import { formatDistanceToNow } from 'date-fns';

type Whiteboard = Tables<'whiteboards'>;

interface WhiteboardGridProps {
  organizationId: string;
}

export const WhiteboardGrid = ({ organizationId }: WhiteboardGridProps) => {
  const navigate = useNavigate();
  const { whiteboards, loading, createWhiteboard, deleteWhiteboard } = useWhiteboards(organizationId);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newWhiteboardTitle, setNewWhiteboardTitle] = useState('');

  const handleCreateWhiteboard = async () => {
    const title = newWhiteboardTitle.trim() || 'Untitled Board';
    const whiteboardId = await createWhiteboard(title);
    
    if (whiteboardId) {
      setCreateDialogOpen(false);
      setNewWhiteboardTitle('');
      navigate(`/whiteboard/${whiteboardId}`);
    }
  };

  const handleWhiteboardClick = (whiteboard: Whiteboard) => {
    navigate(`/whiteboard/${whiteboard.id}`);
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-neutral-900/50 border-neutral-800 animate-pulse">
            <CardContent className="p-6">
              <div className="h-32 bg-neutral-800 rounded-lg mb-4"></div>
              <div className="h-4 bg-neutral-800 rounded mb-2"></div>
              <div className="h-3 bg-neutral-800 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-100">Your Whiteboards</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
              <Plus className="w-4 h-4 mr-2" />
              New Whiteboard
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-neutral-100">Create New Whiteboard</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-neutral-300">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter whiteboard title..."
                  value={newWhiteboardTitle}
                  onChange={(e) => setNewWhiteboardTitle(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-neutral-100"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateWhiteboard()}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWhiteboard}>
                  Create Whiteboard
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {whiteboards.length === 0 ? (
        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-100 mb-2">No whiteboards yet</h3>
            <p className="text-neutral-400 mb-6">Create your first whiteboard to start collaborating</p>
            <Button 
              onClick={() => setCreateDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Whiteboard
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {whiteboards.map((whiteboard) => (
            <Card 
              key={whiteboard.id}
              className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
              onClick={() => handleWhiteboardClick(whiteboard)}
            >
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-4 flex items-center justify-center border border-neutral-700">
                  {whiteboard.thumbnail_url ? (
                    <img 
                      src={whiteboard.thumbnail_url} 
                      alt={whiteboard.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Palette className="w-8 h-8 text-neutral-500" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-neutral-100 truncate flex-1 mr-2">
                      {whiteboard.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWhiteboard(whiteboard.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1 h-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDistanceToNow(new Date(whiteboard.updated_at), { addSuffix: true })}
                    </div>
                    {whiteboard.is_public && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Public
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
