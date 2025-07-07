
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Settings as SettingsIcon, User, Palette, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  const settingsSections = [
    { name: 'Account', icon: User, description: 'Manage your account settings' },
    { name: 'Appearance', icon: Palette, description: 'Customize your workspace' },
    { name: 'Notifications', icon: Bell, description: 'Control your notifications' },
    { name: 'Privacy', icon: Shield, description: 'Privacy and security settings' },
  ];

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
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-100">Settings</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-neutral-100">Settings</h1>
          <p className="text-neutral-400">Manage your preferences and account settings</p>
        </div>

        <div className="grid gap-6">
          {settingsSections.map((section) => (
            <Card key={section.name} className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neutral-100">
                  <section.icon className="w-5 h-5" />
                  {section.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Settings;
