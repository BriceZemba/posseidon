
import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Plus, FileText, Users, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Your Workspace
          </h1>
          <p className="text-xl text-neutral-400">
            Create, collaborate, and bring your ideas to life
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card 
            className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
            onClick={() => handleCardClick('/whiteboard')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                <Plus className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-neutral-100 mb-2">New Board</h3>
              <p className="text-sm text-neutral-400">Start a fresh canvas</p>
            </CardContent>
          </Card>

          <Card 
            className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
            onClick={() => handleCardClick('/templates')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-100 mb-2">Templates</h3>
              <p className="text-sm text-neutral-400">Browse templates</p>
            </CardContent>
          </Card>

          <Card className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-neutral-100 mb-2">Shared</h3>
              <p className="text-sm text-neutral-400">Collaborative boards</p>
            </CardContent>
          </Card>

          <Card 
            className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
            onClick={() => handleCardClick('/settings')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-orange-500/20">
                <Settings className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-semibold text-neutral-100 mb-2">Settings</h3>
              <p className="text-sm text-neutral-400">Manage preferences</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Boards */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-neutral-100">Recent Boards</h2>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-neutral-400 mb-6">No boards yet. Create your first board to get started!</p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0"
              onClick={() => handleCardClick('/whiteboard')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Board
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
