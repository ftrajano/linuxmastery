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
        title: "Try again ❌",
        description: currentEx.hint,
        variant: "destructive",
      });
    }

    setCommand("");
  };

  const currentEx = lsExercises[currentExercise];

  return (
    <div className="space-y-4">
      {/* Exercise Progress */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div>
          <div className="font-medium text-gray-900">
            Exercise {currentExercise + 1} of {lsExercises.length}
          </div>
          <div className="text-sm text-gray-600">
            {isCompleted ? "Lesson Complete! 🎉" : currentEx.instruction}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetLesson}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.319,4.936a7.239,7.239,0,0,1,7.1,2.252,1.25,1.25,0,1,0,1.872-1.657A9.737,9.737,0,0,0,9.743,2.5,10.269,10.269,0,0,0,2.378,9.61a.249.249,0,0,1-.271.178l-1.033-.13A.491.491,0,0,0,.6,9.877a.5.5,0,0,0-.019.526l2.476,4.342a.5.5,0,0,0,.373.248.43.43,0,0,0,.062,0,.5.5,0,0,0,.359-.152l3.477-3.593a.5.5,0,0,0-.3-.844L5.15,10.172a.25.25,0,0,1-.2-.333A7.7,7.7,0,0,1,10.319,4.936Z"/>
            </svg>
            Reset
          </Button>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExercise + (isCompleted ? 1 : 0)) / lsExercises.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm min-h-96">
        {/* Terminal History */}
        <div className="mb-4 space-y-2">
          {terminalHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              <div className={`text-green-400 ${entry.success === false ? 'text-red-400' : ''}`}>
                user@linux:~$ <span className="text-white">{entry.command}</span>
              </div>
              {entry.output && (
                <div className="text-white whitespace-pre-line ml-0 mt-1">
                  {entry.output}
                </div>
              )}
              {entry.success === true && (
                <div className="text-green-400 mt-1">✅ Correct! Moving to next exercise...</div>
              )}
              {entry.success === false && (
                <div className="text-red-400 mt-1">❌ Try again. Hint: {currentEx.hint}</div>
              )}
            </div>
          ))}
        </div>

        {/* Current Input */}
        {!isCompleted && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">user@linux:~$</span>
            <Input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onFocus={startTimer}
              className="bg-transparent text-white flex-1 outline-none font-mono border-none focus:ring-0 p-0"
              placeholder={`Type: ${currentEx.expectedCommand}`}
              autoFocus
            />
            <div className="w-2 h-4 bg-white animate-pulse ml-1"></div>
          </form>
        )}

        {/* Completion Message */}
        {isCompleted && (
          <div className="text-center">
            <div className="text-green-400 text-lg mb-2">🎉 Lesson Complete!</div>
            <div className="text-gray-300 mb-4">
              You completed all {lsExercises.length} exercises in {timeElapsed.toFixed(1)}s with {totalCommands} commands
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      {!isCompleted && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-800">
            <strong>Hint:</strong> {currentEx.hint}
          </div>
        </div>
      )}
    </div>
  );
}