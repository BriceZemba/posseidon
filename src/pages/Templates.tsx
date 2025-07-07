
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileText, Palette, Users, Zap } from 'lucide-react';

const Templates = () => {
  const navigate = useNavigate();

  const templates = [
    { name: 'Brainstorming', icon: Zap, color: 'from-yellow-500/20 to-yellow-600/30', borderColor: 'border-yellow-500/20' },
    { name: 'Flowchart', icon: FileText, color: 'from-blue-500/20 to-blue-600/30', borderColor: 'border-blue-500/20' },
    { name: 'Mind Map', icon: Palette, color: 'from-purple-500/20 to-purple-600/30', borderColor: 'border-purple-500/20' },
    { name: 'Team Planning', icon: Users, color: 'from-green-500/20 to-green-600/30', borderColor: 'border-green-500/20' },
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-100">Templates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-neutral-100">Choose a Template</h1>
          <p className="text-neutral-400">Start with a pre-designed template to speed up your workflow</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card key={template.name} className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${template.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border ${template.borderColor}`}>
                  <template.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">{template.name}</h3>
                <p className="text-sm text-neutral-400">Ready to use template</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Templates;
