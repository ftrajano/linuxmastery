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
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState(0);
  const [commands, setCommands] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
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

    setAttempts(prev => prev + 1);
    setCommands(prev => prev + 1);

    validateCommand.mutate({
      command: command.trim(),
      lessonId: lesson.id
    });

    setCommand("");
  };

  const content = lesson.content as any;

  return (
    <div>
      {showStats && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Lesson One</h3>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Attempts: <span className="font-mono font-medium">{attempts}</span></span>
            <span>Time: <span className="font-mono font-medium">{currentTime.toFixed(1)}s</span></span>
            <span>Commands: <span className="font-mono font-medium">{commands}</span></span>
          </div>
        </div>
      )}
      
      <div className="text-left mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-2">{lesson.title}</h4>
        <p className="text-gray-600 mb-4">{content.scenario}</p>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
        <div className="text-green-400 mb-2">user@sysadmin:~$</div>
        
        {content.mockOutput && (
          <div className="text-white mb-4 whitespace-pre-line">
            {content.mockOutput}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">user@sysadmin:~$</span>
          <Input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="bg-transparent text-white flex-1 outline-none font-mono border-none focus:ring-0 p-0"
            placeholder="Type your command here..."
            disabled={isCompleted}
          />
          <div className="w-2 h-4 bg-white animate-pulse ml-1 terminal-cursor"></div>
        </form>
        
        {feedback && (
          <div className={`mt-4 p-3 rounded ${
            isCompleted ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
          }`}>
            {feedback}
          </div>
        )}
      </div>

      {content.hint && !isCompleted && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Hint:</strong> {content.hint}
          </p>
        </div>
      )}
      
      {isCompleted && (
        <div className="mt-6 text-center">
          <Button className="bg-green-600 hover:bg-green-700">
            Next Lesson
          </Button>
        </div>
      )}
    </div>
  );
}
