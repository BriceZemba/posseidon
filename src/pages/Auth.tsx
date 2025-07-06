
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, ArrowRight } from 'lucide-react';

const Auth = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      
      <Card className="w-full max-w-md bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 relative z-10">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-100">DrawBoard</span>
          </div>

          <SignedOut>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Welcome to DrawBoard
                </h1>
                <p className="text-neutral-400">
                  Sign in to start creating amazing visual content
                </p>
              </div>
              
              <div className="space-y-3">
                <SignInButton fallbackRedirectUrl="/" forceRedirectUrl="/">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SignInButton>
                
                <SignUpButton fallbackRedirectUrl="/" forceRedirectUrl="/">
                  <Button variant="outline" className="w-full border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white">
                    Create Account
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="space-y-6">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Welcome back!
              </h1>
              <div className="flex justify-center">
                <UserButton appearance={{
                  elements: {
                    avatarBox: "w-16 h-16",
                  }
                }} />
              </div>
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
                <a href="/">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </SignedIn>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
