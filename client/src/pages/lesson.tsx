import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import InteractiveTerminal from "@/components/interactive-terminal";
import ProgressiveTerminal from "@/components/progressive-terminal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Lesson } from "@shared/schema";

// All lessons data for navigation
const allLessons = [
  // Chapter 1
  { id: 1, title: "List Directory Contents", command: "ls", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 2, title: "List with Details", command: "ls -l", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 3, title: "Show Hidden Files", command: "ls -a", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 4, title: "Human-Readable Sizes", command: "ls -lh", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 5, title: "Complete Directory Listing", command: "ls -la", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 6, title: "Navigate Directories", command: "cd", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 7, title: "Show Current Directory", command: "pwd", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 8, title: "Create Files", command: "touch", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 9, title: "Create Directories", command: "mkdir", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  // Chapter 2
  { id: 10, title: "Copy Files", command: "cp", chapterTitle: "Chapter 2. File Operations ❤️" },
  { id: 11, title: "Move and Rename", command: "mv", chapterTitle: "Chapter 2. File Operations ❤️" },
  { id: 12, title: "Remove Files", command: "rm", chapterTitle: "Chapter 2. File Operations ❤️" },
  { id: 13, title: "Find Files", command: "find", chapterTitle: "Chapter 2. File Operations ❤️" },
  // Chapter 3
  { id: 14, title: "View File Contents", command: "cat", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 15, title: "Page Through Files", command: "less", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 16, title: "Show File Beginning", command: "head", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 17, title: "Show File End", command: "tail", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 18, title: "Search Text", command: "grep", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 19, title: "Count Words", command: "wc", chapterTitle: "Chapter 3. Text Processing 🪄" },
  // Chapter 4
  { id: 20, title: "Monitor Processes", command: "top", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  { id: 21, title: "List Processes", command: "ps", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  { id: 22, title: "Check Memory Usage", command: "free", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  { id: 23, title: "Check Disk Space", command: "df", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  // Chapter 5
  { id: 24, title: "Terminate Processes", command: "kill", chapterTitle: "Chapter 5. Process Management 🏎️" },
  { id: 25, title: "Service Status", command: "systemctl", chapterTitle: "Chapter 5. Process Management 🏎️" },
  { id: 26, title: "Restart Services", command: "systemctl", chapterTitle: "Chapter 5. Process Management 🏎️" },
  // Chapter 6
  { id: 27, title: "View System Logs", command: "journalctl", chapterTitle: "Chapter 6. Log Analysis 🏔️" },
  { id: 28, title: "Filter Service Logs", command: "journalctl", chapterTitle: "Chapter 6. Log Analysis 🏔️" },
  { id: 29, title: "Follow Live Logs", command: "journalctl", chapterTitle: "Chapter 6. Log Analysis 🏔️" },
  // Chapter 7
  { id: 30, title: "Test Network Connectivity", command: "ping", chapterTitle: "Chapter 7. Network & System Info 🔎" },
  { id: 31, title: "Download Files", command: "wget", chapterTitle: "Chapter 7. Network & System Info 🔎" },
  { id: 32, title: "Transfer Data", command: "curl", chapterTitle: "Chapter 7. Network & System Info 🔎" },
  { id: 33, title: "Show System Information", command: "uname", chapterTitle: "Chapter 7. Network & System Info 🔎" }
];

export default function Lesson() {
  const { id } = useParams();
  
  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
    enabled: !!id,
  });

  // Statistics state
  const [stats, setStats] = useState({
    currentExercise: 1,
    totalExercises: 10,
    attempts: 0,
    timeElapsed: 0,
    commands: 0
  });

  // Navigation logic
  const currentLessonId = parseInt(id || "0");
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const currentLessonData = allLessons.find(l => l.id === currentLessonId);

  const handleStatsUpdate = (newStats: typeof stats) => {
    setStats(newStats);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-50 overflow-hidden">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/chapters">
                <Button variant="ghost" size="sm">Chapters</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex h-full p-6">
          <div className="flex-1 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="h-screen bg-gray-50 overflow-hidden">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/chapters">
                <Button variant="ghost" size="sm">Chapters</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
            <Link href="/chapters">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chapters
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/chapters">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"/>
                  </svg>
                  <span>Chapters</span>
                </Button>
              </Link>
            </div>
            
            <div className="flex-1"></div>
            
            {nextLesson && (
              <Link href={`/lesson/${nextLesson.id}`}>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600">
                  Next Lesson
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Left Side - Exercise */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Exercise Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {lesson?.title || 'Loading...'}
              </h1>
              <p className="text-gray-600 mb-4">
                {lesson?.description || 'Loading lesson description...'}
              </p>
              
              {/* Command Explanations */}
              {currentLessonId === 1 && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Understanding the `ls` command:</h3>
                  <div className="space-y-2 text-sm">
                    <div><code className="bg-blue-100 px-2 py-1 rounded text-blue-800">ls</code> - List directory contents (basic)</div>
                    <div><code className="bg-blue-100 px-2 py-1 rounded text-blue-800">ls -F</code> - Add indicators (/ for directories, * for executables)</div>
                    <div><code className="bg-blue-100 px-2 py-1 rounded text-blue-800">ls -l</code> - Long format (permissions, size, date)</div>
                    <div><code className="bg-blue-100 px-2 py-1 rounded text-blue-800">ls -a</code> - Show all files including hidden ones (.files)</div>
                    <div><code className="bg-blue-100 px-2 py-1 rounded text-blue-800">ls -lh</code> - Long format with human-readable file sizes</div>
                    <div><code className="bg-blue-100 px-2 py-1 rounded text-blue-800">ls -r</code> - Reverse order</div>
                    <div><code className="bg-blue-100 px-2 py-1 rounded text-blue-800">ls -t</code> - Sort by modification time</div>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal/Exercise Area */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                {lesson && currentLessonId === 1 ? (
                  <ProgressiveTerminal lesson={lesson} onStatsUpdate={handleStatsUpdate} />
                ) : lesson ? (
                  <InteractiveTerminal lesson={lesson} />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Stats and Progress */}
        <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Current Session Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Session</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <div className="text-white font-bold text-sm">{stats.attempts}</div>
                  </div>
                  <div className="text-xs text-gray-500">Attempts</div>
                  <div className="text-sm font-semibold">Get to 10</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.timeElapsed.toFixed(1)}s</div>
                  <div className="text-xs text-gray-500">Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.commands}</div>
                  <div className="text-xs text-gray-500">Commands</div>
                </div>
              </div>
              
              {/* Exercise Progress */}
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Exercise Progress</span>
                  <span className="font-medium">{stats.currentExercise} / {stats.totalExercises}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.currentExercise / stats.totalExercises) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Progress Circles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Total Time</div>
                    <div className="text-sm text-gray-500">Get to 600s</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    0.0s
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Fastest Time</div>
                    <div className="text-sm text-gray-500">Get to 20s</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    -
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Fewest Keystrokes</div>
                    <div className="text-sm text-gray-500">Get to 100</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    -
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center mb-2">
                  <div className="font-medium text-gray-900">Average Time</div>
                  <div className="text-2xl font-bold text-gray-900">-</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="font-medium text-gray-900">Average Keystrokes</div>
                  <div className="text-2xl font-bold text-gray-900">-</div>
                </div>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Time</h4>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0z"/>
                    </svg>
                  </Button>
                </div>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Chart Area
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Keystrokes</h4>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0z"/>
                    </svg>
                  </Button>
                </div>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
