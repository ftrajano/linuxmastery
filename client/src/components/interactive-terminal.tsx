import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lesson } from "@shared/schema";

interface InteractiveTerminalProps {
  lesson: Lesson;
  showStats?: boolean;
}

export default function InteractiveTerminal({ lesson, showStats = false }: InteractiveTerminalProps) {
  const [command, setCommand] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState(0);
  const [commands, setCommands] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  const validateCommand = useMutation({
    mutationFn: async ({ command, lessonId }: { command: string; lessonId: number }) => {
      const response = await apiRequest("POST", `/api/lessons/${lessonId}/validate`, {
        command,
        userId: 1 // Mock user ID
      });
      return response.json();
    },
    onSuccess: (data) => {
      setFeedback(data.feedback);
      if (data.isCorrect) {
        setIsCompleted(true);
        toast({
          title: "Correct!",
          description: "You've completed this lesson successfully.",
        });
      } else {
        toast({
          title: "Try again",
          description: data.feedback,
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to validate command",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const trimmedCommand = command.trim();
    setCommands(prev => prev + 1);
    setAttempts(prev => prev + 1);
    
    validateCommand.mutate({
      command: trimmedCommand,
      lessonId: lesson.id
    });

    setCommand("");
  };


  const content = lesson.content as any;

  return (
    <div>

      {showStats && (
        <div className="flex justify-between items-center mb-6 bg-terminal-dark border border-terminal-border rounded-lg p-4">
          <h3 className="text-xl font-semibold text-gray-100">Lesson {lesson.id}</h3>
          <div className="flex space-x-4 text-sm text-gray-400">
            <span>attempts: <span className="font-mono text-terminal-amber">{attempts}</span></span>
            <span>time: <span className="font-mono text-terminal-amber">{currentTime.toFixed(1)}s</span></span>
            <span>commands: <span className="font-mono text-terminal-amber">{commands}</span></span>
          </div>
        </div>
      )}
      
      <div className="text-left mb-6">
        <h4 className="text-lg font-medium text-gray-100 mb-2">{lesson.title}</h4>
        <p className="text-gray-400 mb-4">{content.scenario}</p>
      </div>

      {/* Terminal with window chrome */}
      <div className="terminal-window">
        {/* macOS-style titlebar */}
        <div className="terminal-titlebar">
          <div className="terminal-buttons">
            <div className="terminal-button close"></div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-500 font-mono">
              user@linuxmastery: ~/lessons
            </span>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Terminal content */}
        <div className="terminal-content">
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="prompt-user">user@linux</span>
            <span className="prompt-separator">:</span>
            <span className="prompt-path">~</span>
            <span className="prompt-symbol">$ </span>
            <Input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="bg-transparent text-gray-100 flex-1 outline-none font-mono border-none focus:ring-0 p-0 placeholder:text-gray-600"
              placeholder="Type your command here..."
              disabled={isCompleted}
            />
            <div className="terminal-cursor"></div>
          </form>

          {feedback && (
            <div className={`mt-4 p-3 rounded ${
              isCompleted ? 'bg-terminal-green-dim/20 text-terminal-green border border-terminal-green/30' : 'bg-syntax-red/10 text-syntax-red border border-syntax-red/30'
            }`}>
              {feedback}
            </div>
          )}

          {/* Completion Message */}
          {isCompleted && (
            <div className="text-center py-8 mt-4">
              <div className="text-terminal-green text-xl mb-3 text-glow-green">
                Lesson Complete!
              </div>
              <div className="text-gray-400">
                You've mastered the{' '}
                <code className="text-terminal-amber font-mono bg-terminal-gray px-2 py-1 rounded">{lesson.command}</code>{' '}
                command.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hint */}
      {content.hint && !isCompleted && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="text-gray-500 hover:text-terminal-amber font-mono text-sm"
          >
            {showHint ? '[-] hide hint' : '[+] show hint'}
          </Button>
          {showHint && (
            <div className="mt-3 p-4 bg-terminal-dark border-l-2 border-terminal-amber rounded-r">
              <div className="flex items-start space-x-3">
                <span className="text-terminal-amber font-mono text-sm">hint:</span>
                <p className="text-gray-300 text-sm font-mono">
                  {content.hint}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
