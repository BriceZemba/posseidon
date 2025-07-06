
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Palette, Type, Square, Users, Zap, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DrawBoard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hover:bg-blue-50">Features</Button>
          <Button variant="ghost" className="hover:bg-blue-50">Pricing</Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Create, Collaborate,
            <br />
            <span className="relative">
              Innovate
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform scale-x-0 animate-[scale-x-100_1s_ease-out_1s_forwards]"></div>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate digital whiteboard for teams and creators. Draw, design, and brainstorm with powerful tools and seamless collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200">
              Start Drawing Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-300 hover:border-blue-400 px-8 py-4 text-lg font-semibold">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Preview Image Placeholder */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-500">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="text-center z-10">
                <Palette className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <p className="text-slate-600 text-lg font-medium">Interactive Whiteboard Preview</p>
                <p className="text-slate-500">Coming Soon</p>
              </div>
              {/* Floating elements for visual interest */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-purple-200 rounded-lg opacity-60 animate-pulse delay-300"></div>
              <div className="absolute top-1/3 right-8 w-6 h-6 bg-green-200 rounded-full opacity-60 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              Everything you need to create
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful tools and intuitive design come together in one seamless experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Free Drawing</h3>
                <p className="text-slate-600 leading-relaxed">
                  Express your ideas naturally with smooth, responsive drawing tools and customizable brushes
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Square className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Shapes & Arrows</h3>
                <p className="text-slate-600 leading-relaxed">
                  Create perfect diagrams with smart shapes, arrows, and connectors that snap into place
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Type className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Rich Text</h3>
                <p className="text-slate-600 leading-relaxed">
                  Add styled text anywhere on your canvas with full formatting and font customization
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real-time Collaboration</h3>
                <p className="text-slate-600 leading-relaxed">
                  Work together seamlessly with live cursors, comments, and instant synchronization
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Lightning Fast</h3>
                <p className="text-slate-600 leading-relaxed">
                  Optimized performance ensures smooth interaction even with complex drawings
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Export & Share</h3>
                <p className="text-slate-600 leading-relaxed">
                  Export to multiple formats or share with a simple link for instant collaboration
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to bring your ideas to life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators and teams who trust DrawBoard for their visual collaboration
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200">
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DrawBoard</span>
          </div>
          <p className="text-slate-400 mb-6">
            The future of visual collaboration is here
          </p>
          <div className="flex justify-center gap-8 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
