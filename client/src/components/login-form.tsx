import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface LoginFormProps {
  onLogin: (user: { id: number; username: string; email: string }) => void;
  onClose: () => void;
}

export function LoginForm({ onLogin, onClose }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
        onClose();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-terminal-dark border-terminal-border">
      <CardHeader>
        <CardTitle className="text-gray-100 font-mono">
          <span className="text-terminal-green">$</span> login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-terminal-black border-terminal-border text-gray-100 font-mono placeholder:text-gray-600"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-terminal-black border-terminal-border text-gray-100 font-mono placeholder:text-gray-600"
              required
            />
          </div>
          {error && (
            <div className="text-syntax-red text-sm font-mono">{error}</div>
          )}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1 bg-terminal-green-dim hover:bg-terminal-green text-white border border-terminal-green font-mono">
              {loading ? "authenticating..." : "$ authenticate"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="border-terminal-border text-gray-400 hover:text-gray-100 bg-transparent font-mono">
              cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}