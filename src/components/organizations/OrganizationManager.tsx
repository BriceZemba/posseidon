
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Users, Settings } from 'lucide-react';
import { CreateOrganization } from './CreateOrganization';
import { OrganizationProfile } from './OrganizationProfile';
import { OrganizationList } from './OrganizationList';
import { useOrganization } from '@/hooks/useOrganization';

export const OrganizationManager = () => {
  const [createOrgOpen, setCreateOrgOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const { organization, organizationName } = useOrganization();

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-neutral-100 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Organization Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Create Organization */}
          <Dialog open={createOrgOpen} onOpenChange={setCreateOrgOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-auto p-4 text-left border-neutral-700">
                <div className="flex flex-col items-center gap-2">
                  <Plus className="w-6 h-6 text-green-400" />
                  <span className="text-sm font-medium text-neutral-100">Create Organization</span>
                  <span className="text-xs text-neutral-400">Start a new workspace</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Organization</DialogTitle>
              </DialogHeader>
              <CreateOrganization />
            </DialogContent>
          </Dialog>

          {/* Organization Profile */}
          <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left border-neutral-700"
                disabled={!organization}
              >
                <div className="flex flex-col items-center gap-2">
                  <Settings className="w-6 h-6 text-blue-400" />
                  <span className="text-sm font-medium text-neutral-100">Manage Organization</span>
                  <span className="text-xs text-neutral-400">
                    {organization ? `Settings for ${organizationName}` : 'No organization selected'}
                  </span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Organization Profile</DialogTitle>
              </DialogHeader>
              <OrganizationProfile />
            </DialogContent>
          </Dialog>

          {/* Organization List */}
          <Dialog open={listOpen} onOpenChange={setListOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-auto p-4 text-left border-neutral-700">
                <div className="flex flex-col items-center gap-2">
                  <Users className="w-6 h-6 text-purple-400" />
                  <span className="text-sm font-medium text-neutral-100">Switch Organization</span>
                  <span className="text-xs text-neutral-400">View all organizations</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Select Organization</DialogTitle>
              </DialogHeader>
              <OrganizationList />
            </DialogContent>
          </Dialog>
        </div>

        {organization && (
          <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <h4 className="text-sm font-medium text-neutral-100 mb-2">Current Organization</h4>
            <p className="text-neutral-300">{organizationName}</p>
            <p className="text-xs text-neutral-500 mt-1">ID: {organization.id}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
