
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Palette, Type, Square, Users, Zap, Download } from "lucide-react";
import { SplineSceneBasic } from "@/components/ui/demo";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Spline scene */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <SplineSceneBasic />
        </div>
      </section>

      {/* Features Section - Redesigned to match hero */}
      <section className="px-6 py-20 bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Everything you need to create
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Powerful tools and intuitive design come together in one seamless experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                  <Palette className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Free Drawing</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Express your ideas naturally with smooth, responsive drawing tools and customizable brushes
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                  <Square className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Shapes & Arrows</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Create perfect diagrams with smart shapes, arrows, and connectors that snap into place
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                  <Type className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Rich Text</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Add styled text anywhere on your canvas with full formatting and font customization
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-orange-500/20">
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Real-time Collaboration</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Work together seamlessly with live cursors, comments, and instant synchronization
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-pink-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-pink-500/20">
                  <Zap className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Lightning Fast</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Optimized performance ensures smooth interaction even with complex drawings
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-neutral-800 hover:border-neutral-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-indigo-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-indigo-500/20">
                  <Download className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Export & Share</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Export to multiple formats or share with a simple link for instant collaboration
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned with dark theme */}
      <section className="px-6 py-20 bg-gradient-to-r from-neutral-900 via-black to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Ready to bring your ideas to life?
          </h2>
          <p className="text-xl mb-8 text-neutral-300">
            Join thousands of creators and teams who trust DrawBoard for their visual collaboration
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 border-0">
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer - Redesigned to match dark theme */}
      <footer className="bg-black border-t border-neutral-800 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-100">DrawBoard</span>
          </div>
          <p className="text-neutral-400 mb-6">
            The future of visual collaboration is here
          </p>
          <div className="flex justify-center gap-8 text-sm text-neutral-500">
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
