import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import InteractiveTerminal from "@/components/interactive-terminal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import type { Lesson } from "@shared/schema";

// All lessons data for navigation
const allLessons = [
  // Chapter 1
  { id: 1, title: "List Directory Contents", command: "ls", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 2, title: "Navigate Directories", command: "cd", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 3, title: "Show Current Directory", command: "pwd", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 4, title: "Create Files", command: "touch", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  { id: 5, title: "Create Directories", command: "mkdir", chapterTitle: "Chapter 1. File Navigation Essentials 🔥" },
  // Chapter 2
  { id: 6, title: "Copy Files", command: "cp", chapterTitle: "Chapter 2. File Operations ❤️" },
  { id: 7, title: "Move and Rename", command: "mv", chapterTitle: "Chapter 2. File Operations ❤️" },
  { id: 8, title: "Remove Files", command: "rm", chapterTitle: "Chapter 2. File Operations ❤️" },
  { id: 9, title: "Find Files", command: "find", chapterTitle: "Chapter 2. File Operations ❤️" },
  // Chapter 3
  { id: 10, title: "View File Contents", command: "cat", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 11, title: "Page Through Files", command: "less", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 12, title: "Show File Beginning", command: "head", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 13, title: "Show File End", command: "tail", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 14, title: "Search Text", command: "grep", chapterTitle: "Chapter 3. Text Processing 🪄" },
  { id: 15, title: "Count Words", command: "wc", chapterTitle: "Chapter 3. Text Processing 🪄" },
  // Chapter 4
  { id: 16, title: "Monitor Processes", command: "top", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  { id: 17, title: "List Processes", command: "ps", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  { id: 18, title: "Check Memory Usage", command: "free", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  { id: 19, title: "Check Disk Space", command: "df", chapterTitle: "Chapter 4. System Monitoring 🚀" },
  // Chapter 5
  { id: 20, title: "Terminate Processes", command: "kill", chapterTitle: "Chapter 5. Process Management 🏎️" },
  { id: 21, title: "Service Status", command: "systemctl", chapterTitle: "Chapter 5. Process Management 🏎️" },
  { id: 22, title: "Restart Services", command: "systemctl", chapterTitle: "Chapter 5. Process Management 🏎️" },
  // Chapter 6
  { id: 23, title: "View System Logs", command: "journalctl", chapterTitle: "Chapter 6. Log Analysis 🏔️" },
  { id: 24, title: "Filter Service Logs", command: "journalctl", chapterTitle: "Chapter 6. Log Analysis 🏔️" },
  { id: 25, title: "Follow Live Logs", command: "journalctl", chapterTitle: "Chapter 6. Log Analysis 🏔️" },
  // Chapter 7
  { id: 26, title: "Test Network Connectivity", command: "ping", chapterTitle: "Chapter 7. Network & System Info 🔎" },
  { id: 27, title: "Download Files", command: "wget", chapterTitle: "Chapter 7. Network & System Info 🔎" },
  { id: 28, title: "Transfer Data", command: "curl", chapterTitle: "Chapter 7. Network & System Info 🔎" },
  { id: 29, title: "Show System Information", command: "uname", chapterTitle: "Chapter 7. Network & System Info 🔎" }
];

export default function LessonBackup() {
  const { id } = useParams();
  
  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
    enabled: !!id,
  });

  // Navigation logic
  const currentLessonId = parseInt(id || "0");
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const currentLessonData = allLessons.find(l => l.id === currentLessonId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/chapters">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapters
            </Button>
          </Link>
          
          {currentLessonData && (
            <div className="text-sm text-gray-600">
              {currentLessonData.chapterTitle}
            </div>
          )}
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold text-gray-900">{lesson?.title || 'Loading...'}</h1>
                  {lesson?.command && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {lesson.command}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Lesson {currentLessonId} of {allLessons.length}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{lesson?.description || 'Loading lesson description...'}</p>
            </div>
            
            {lesson && <InteractiveTerminal lesson={lesson} />}
            
            {/* Navigation Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {previousLesson ? (
                    <Link href={`/lesson/${previousLesson.id}`}>
                      <Button variant="outline" className="group">
                        <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <div className="text-left">
                          <div className="text-xs text-gray-500">Previous</div>
                          <div className="font-medium">{previousLesson.title}</div>
                        </div>
                      </Button>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
                
                <div className="flex-1 text-center">
                  <Link href="/chapters">
                    <Button variant="ghost" size="sm">
                      All Chapters
                    </Button>
                  </Link>
                </div>
                
                <div className="flex-1 flex justify-end">
                  {nextLesson ? (
                    <Link href={`/lesson/${nextLesson.id}`}>
                      <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                        <div className="text-right mr-2">
                          <div className="text-xs opacity-90">Next</div>
                          <div className="font-medium">{nextLesson.title}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-2">🎉 Course Complete!</div>
                      <Link href="/chapters">
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700">
                          Back to Chapters
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}