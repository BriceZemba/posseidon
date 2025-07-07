
import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Plus, FileText, Users, Settings } from 'lucide-react';
import { OrganizationSwitcher } from '@/components/organizations/OrganizationSwitcher';
import { OrganizationManager } from '@/components/organizations/OrganizationManager';
import { WhiteboardGrid } from '@/components/dashboard/WhiteboardGrid';
import { useOrganization } from '@/hooks/useOrganization';
import { useWhiteboards } from '@/hooks/useWhiteboards';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { organizationName, organizationId } = useOrganization();
  const { createWhiteboard } = useWhiteboards(organizationId);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleQuickCreateWhiteboard = async () => {
    const whiteboardId = await createWhiteboard();
    if (whiteboardId) {
      navigate(`/whiteboard/${whiteboardId}`);
    }
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
            <OrganizationSwitcher />
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
            {organizationName}
          </h1>
          <p className="text-xl text-neutral-400">
            Create, collaborate, and bring your ideas to life
          </p>
        </div>

        {/* Organization Management Section */}
        <div className="mb-12">
          <OrganizationManager />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card 
            className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
            onClick={handleQuickCreateWhiteboard}
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

        {/* Whiteboards Grid */}
        <WhiteboardGrid organizationId={organizationId} />
      </main>
    </div>
  );
};

export default Dashboard;
