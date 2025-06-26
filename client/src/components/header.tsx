import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "./login-form";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<{ id: number; username: string; email: string } | null>(null);

  const handleLogin = (userData: { id: number; username: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Redirect to chapters page after login
    window.location.href = '/chapters';
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <header 
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-gray-200/50"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link href="/">
            <button className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
                L
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                LinuxMastery
              </h1>
            </button>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#lessons" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Lessons
            </a>
            <a href="#practice" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Practice
            </a>
            <a href="#progress" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Progress
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  View Progress
                </Button>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">Welcome, {user.username}!</span>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="border-gray-300 hover:border-gray-400"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setShowLogin(true)}
                >
                  View Demo
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-200 group"
                  onClick={() => setShowLogin(true)}
                >
                  Get Started
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="currentColor"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent>
          <LoginForm 
            onLogin={handleLogin} 
            onClose={() => setShowLogin(false)} 
          />
        </DialogContent>
      </Dialog>
    </header>
  );
}
