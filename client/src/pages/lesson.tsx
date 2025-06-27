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
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

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
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/chapters">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chapters
              </Button>
            </Link>
            
            {nextLesson && (
              <Link href={`/lesson/${nextLesson.id}`}>
                <Button>
                  Next Lesson
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Centered and Clean */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Simple Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {lesson?.title || 'Loading...'}
            </h1>
            <p className="text-gray-600">
              {lesson?.description || 'Loading lesson description...'}
            </p>
          </div>

          {/* Terminal Area - Focus on Learning */}
          <div className="bg-white rounded-lg shadow-sm">
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
    </div>
  );
}
