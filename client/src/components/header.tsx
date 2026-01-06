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
      className="sticky top-0 z-50 bg-terminal-black/95 backdrop-blur-md border-b border-terminal-border"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link href="/">
            <button className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
              <div className="font-mono text-terminal-green text-xl font-semibold">
                <span className="text-terminal-green-dim">$</span>
                <span className="text-terminal-green animate-pulse">_</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-100 group-hover:text-terminal-green transition-colors">
                LinuxMastery
              </h1>
            </button>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#lessons" className="text-gray-400 hover:text-terminal-green transition-colors font-mono text-sm">
              ./lessons
            </a>
            <a href="#practice" className="text-gray-400 hover:text-terminal-green transition-colors font-mono text-sm">
              ./practice
            </a>
            <a href="#progress" className="text-gray-400 hover:text-terminal-green transition-colors font-mono text-sm">
              ./progress
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-terminal-green hover:bg-terminal-gray font-mono text-sm"
                >
                  [progress]
                </Button>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 font-mono text-sm">
                    <span className="text-terminal-green">user</span>@{user.username}
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-terminal-border text-gray-400 hover:text-syntax-red hover:border-syntax-red bg-transparent font-mono text-sm"
                  >
                    [logout]
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-terminal-green hover:bg-terminal-gray font-mono text-sm"
                  onClick={() => setShowLogin(true)}
                >
                  [demo]
                </Button>
                <Button
                  className="bg-terminal-green-dim text-white hover:bg-terminal-green border border-terminal-green transition-all duration-200 font-mono text-sm"
                  onClick={() => setShowLogin(true)}
                >
                  $ start --now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="bg-terminal-dark border-terminal-border">
          <LoginForm
            onLogin={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
}
