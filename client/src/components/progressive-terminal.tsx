import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TerminalSimulator } from "@/lib/terminal-simulator";
import type { Lesson } from "@shared/schema";

interface ProgressiveTerminalProps {
  lesson: Lesson;
  onStatsUpdate?: (stats: {
    currentExercise: number;
    totalExercises: number;
    attempts: number;
    timeElapsed: number;
    commands: number;
  }) => void;
}

// Exercícios para a lição 1 (ls command)
const lsExercises = [
  {
    id: 1,
    instruction: "List the basic directory contents",
    expectedCommand: "ls",
    hint: "Use the basic ls command without any flags"
  },
  {
    id: 2,
    instruction: "List files with indicators showing file types",
    expectedCommand: "ls -F",
    hint: "Use the -F flag to show file type indicators"
  },
  {
    id: 3,
    instruction: "List files in long format",
    expectedCommand: "ls -l",
    hint: "Use the -l flag for detailed file information"
  },
  {
    id: 4,
    instruction: "List all files including hidden ones",
    expectedCommand: "ls -a",
    hint: "Use the -a flag to show hidden files that start with '.'"
  },
  {
    id: 5,
    instruction: "List all files in long format with human-readable sizes",
    expectedCommand: "ls -lh",
    hint: "Combine -l and -h flags for detailed info with readable file sizes"
  },
  {
    id: 6,
    instruction: "List all hidden files in long format",
    expectedCommand: "ls -la",
    hint: "Combine -l and -a flags to show all files in detailed format"
  },
  {
    id: 7,
    instruction: "List files in reverse order",
    expectedCommand: "ls -r",
    hint: "Use the -r flag to reverse the listing order"
  },
  {
    id: 8,
    instruction: "List files sorted by modification time",
    expectedCommand: "ls -t",
    hint: "Use the -t flag to sort by time (newest first)"
  },
  {
    id: 9,
    instruction: "List files sorted by time in reverse order",
    expectedCommand: "ls -tr",
    hint: "Combine -t and -r flags to show oldest files first"
  },
  {
    id: 10,
    instruction: "List all files in long format sorted by time with human-readable sizes",
    expectedCommand: "ls -lath",
    hint: "Combine -l, -a, -t, and -h flags for complete file information"
  }
];

export default function ProgressiveTerminal({ lesson, onStatsUpdate }: ProgressiveTerminalProps) {
  const [command, setCommand] = useState("");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [totalCommands, setTotalCommands] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<Array<{command: string, output: string, success?: boolean}>>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<TerminalSimulator>(new TerminalSimulator());
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (startTime && !isCompleted) {
      const interval = setInterval(() => {
        setTimeElapsed((Date.now() - startTime) / 1000);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, isCompleted]);

  // Update parent stats
  useEffect(() => {
    if (onStatsUpdate) {
      onStatsUpdate({
        currentExercise: currentExercise + 1,
        totalExercises: lsExercises.length,
        attempts,
        timeElapsed,
        commands: totalCommands
      });
    }
  }, [currentExercise, attempts, timeElapsed, totalCommands, onStatsUpdate]);

  const startTimer = () => {
    if (!hasStarted && !startTime) {
      setStartTime(Date.now());
      setHasStarted(true);
    }
  };

  const resetLesson = () => {
    setCurrentExercise(0);
    setAttempts(0);
    setTotalCommands(0);
    setStartTime(null);
    setTimeElapsed(0);
    setTerminalHistory([]);
    setIsCompleted(false);
    setHasStarted(false);
    setCommand("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Start timer on first command
    startTimer();

    const trimmedCommand = command.trim();
    setTotalCommands(prev => prev + 1);
    setAttempts(prev => prev + 1);

    const currentEx = lsExercises[currentExercise];
    const isCorrect = trimmedCommand === currentEx.expectedCommand;

    // Execute command in simulator for output
    const result = terminalRef.current.executeCommand(trimmedCommand);
    
    // Add to history
    setTerminalHistory(prev => [...prev, {
      command: trimmedCommand,
      output: result.output,
      success: isCorrect
    }]);

    if (isCorrect) {
      toast({
        title: "Correct! ✅",
        description: `Exercise ${currentExercise + 1} completed`,
      });

      // Move to next exercise or complete lesson
      if (currentExercise < lsExercises.length - 1) {
        setTimeout(() => {
          setCurrentExercise(prev => prev + 1);
          setTerminalHistory([]); // Clear terminal for next exercise
        }, 1500);
      } else {
        setIsCompleted(true);
        toast({
          title: "Lesson Complete! 🎉",
          description: `All ${lsExercises.length} exercises completed!`,
        });
      }
    } else {
      toast({
        title: "Try again",
        description: "Check your command and try again. Use the hint button if you need help.",
        variant: "destructive",
      });
    }

    setCommand("");
  };

  const currentEx = lsExercises[currentExercise];

  return (
    <div className="space-y-4">
      {/* Exercise Progress */}
      <div className="flex items-center justify-between bg-terminal-dark border border-terminal-border rounded-lg p-4">
        <div>
          <div className="font-medium text-gray-100">
            Exercise {currentExercise + 1} of {lsExercises.length}
          </div>
          <div className="text-sm text-gray-400">
            {isCompleted ? "Lesson Complete!" : currentEx.instruction}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetLesson}
            className="text-gray-400 hover:text-terminal-green font-mono text-sm"
          >
            [reset]
          </Button>
          {/* Segmented progress indicator */}
          <div className="flex items-center space-x-1">
            {lsExercises.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 ${
                  index < currentExercise
                    ? 'bg-terminal-green'
                    : index === currentExercise
                      ? 'bg-terminal-green animate-pulse'
                      : 'bg-terminal-gray'
                }`}
              />
            ))}
          </div>
        </div>
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
          {/* Terminal History */}
          <div className="mb-4 space-y-3">
            {terminalHistory.map((entry, index) => (
              <div key={index}>
                <div className="flex items-start">
                  <span className="prompt-user">user@linux</span>
                  <span className="prompt-separator">:</span>
                  <span className="prompt-path">~</span>
                  <span className="prompt-symbol">$ </span>
                  <span className={`text-gray-100 ${entry.success === false ? 'text-syntax-red' : ''}`}>
                    {entry.command}
                  </span>
                </div>
                {entry.output && (
                  <pre className="text-gray-300 whitespace-pre-wrap mt-1 text-sm leading-relaxed">
                    {entry.output}
                  </pre>
                )}
                {entry.success === true && (
                  <div className="text-terminal-green mt-2 font-medium">
                    Correct! Moving to next exercise...
                  </div>
                )}
                {entry.success === false && (
                  <div className="text-syntax-red mt-2">
                    Try again.
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Current Input */}
          {!isCompleted && (
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
                onFocus={startTimer}
                className="bg-transparent text-gray-100 flex-1 outline-none font-mono border-none focus:ring-0 p-0 placeholder:text-gray-600"
                placeholder="Type your command here..."
                autoFocus
              />
              <div className="terminal-cursor"></div>
            </form>
          )}

          {/* Completion Message */}
          {isCompleted && (
            <div className="text-center py-8">
              <div className="text-terminal-green text-xl mb-3 text-glow-green">
                Lesson Complete!
              </div>
              <div className="text-gray-400">
                You completed all {lsExercises.length} exercises in{' '}
                <span className="text-terminal-amber font-mono">{timeElapsed.toFixed(1)}s</span> with{' '}
                <span className="text-terminal-amber font-mono">{totalCommands}</span> commands
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hint */}
      {!isCompleted && (
        <div>
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
                  {currentEx.hint}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}