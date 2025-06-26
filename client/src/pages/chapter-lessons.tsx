import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Lesson {
  id: number;
  title: string;
  description: string;
  command: string;
  completed: boolean;
}

const chapterData: Record<string, { title: string; lessons: Lesson[] }> = {
  "1": {
    title: "File Navigation Essentials",
    lessons: [
      { id: 1, title: "List Directory Contents with ls", description: "Learn basic file and directory listing with ls", command: "ls", completed: false },
      { id: 2, title: "List with Details using ls -l", description: "View detailed file information with permissions and sizes", command: "ls -l", completed: false },
      { id: 3, title: "Show Hidden Files with ls -a", description: "Display hidden files and directories that start with .", command: "ls -a", completed: false },
      { id: 4, title: "Human-Readable Sizes with ls -lh", description: "Show file sizes in KB, MB, GB format for easier reading", command: "ls -lh", completed: false },
      { id: 5, title: "Complete Directory Listing with ls -la", description: "Combine detailed view with hidden files for full directory overview", command: "ls -la", completed: false },
      { id: 6, title: "Navigate Directories with cd", description: "Change directories and navigate the filesystem", command: "cd", completed: false },
      { id: 7, title: "Show Current Directory with pwd", description: "Display the full path of your current directory", command: "pwd", completed: false },
      { id: 8, title: "Create Files with touch", description: "Create new empty files quickly", command: "touch", completed: false },
      { id: 9, title: "Create Directories with mkdir", description: "Make new directories in the filesystem", command: "mkdir", completed: false }
    ]
  },
  "2": {
    title: "File Operations",
    lessons: [
      { id: 10, title: "Copy Files with cp", description: "Duplicate files and directories", command: "cp", completed: false },
      { id: 11, title: "Move and Rename with mv", description: "Move files between directories or rename them", command: "mv", completed: false },
      { id: 12, title: "Remove Files with rm", description: "Delete files and directories safely", command: "rm", completed: false },
      { id: 13, title: "Find Files with find", description: "Search for files and directories by various criteria", command: "find", completed: false }
    ]
  },
  "3": {
    title: "Text Processing",
    lessons: [
      { id: 14, title: "View File Contents with cat", description: "Display the entire contents of text files", command: "cat", completed: false },
      { id: 15, title: "Page Through Files with less", description: "View large files one page at a time", command: "less", completed: false },
      { id: 16, title: "Show File Beginning with head", description: "Display the first lines of a file", command: "head", completed: false },
      { id: 17, title: "Show File End with tail", description: "Display the last lines of a file", command: "tail", completed: false },
      { id: 18, title: "Search Text with grep", description: "Find specific patterns in files and output", command: "grep", completed: false },
      { id: 19, title: "Count Words with wc", description: "Count lines, words, and characters in files", command: "wc", completed: false }
    ]
  },
  "4": {
    title: "System Monitoring",
    lessons: [
      { id: 20, title: "Monitor Processes with top", description: "View running processes and system resource usage", command: "top", completed: false },
      { id: 21, title: "List Processes with ps", description: "Show detailed information about running processes", command: "ps", completed: false },
      { id: 22, title: "Check Memory Usage with free", description: "Display memory usage information", command: "free", completed: false },
      { id: 23, title: "Check Disk Space with df", description: "Display filesystem disk space usage", command: "df", completed: false }
    ]
  },
  "5": {
    title: "Process & Service Management",
    lessons: [
      { id: 24, title: "Terminate Processes with kill", description: "Stop processes by their process ID", command: "kill", completed: false },
      { id: 25, title: "Service Status with systemctl", description: "Check and control system services", command: "systemctl", completed: false },
      { id: 26, title: "Restart Services with systemctl", description: "Restart system services", command: "systemctl", completed: false }
    ]
  },
  "6": {
    title: "Log Analysis",
    lessons: [
      { id: 27, title: "View System Logs with journalctl", description: "Query and analyze system logs using journalctl", command: "journalctl", completed: false },
      { id: 28, title: "Filter Service Logs with journalctl", description: "View logs for specific services", command: "journalctl", completed: false },
      { id: 29, title: "Follow Live Logs with journalctl", description: "Monitor logs in real-time", command: "journalctl", completed: false }
    ]
  },
  "7": {
    title: "Network & System Info",
    lessons: [
      { id: 30, title: "Test Network Connectivity with ping", description: "Check if a remote host is reachable", command: "ping", completed: false },
      { id: 31, title: "Download Files with wget", description: "Download files from the internet", command: "wget", completed: false },
      { id: 32, title: "Transfer Data with curl", description: "Make HTTP requests and transfer data", command: "curl", completed: false },
      { id: 33, title: "Show System Information with uname", description: "Display system and kernel information", command: "uname", completed: false }
    ]
  }
};

export default function ChapterLessonsPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to continue</h2>
          <Link href="/">
            <a className="text-blue-600 hover:text-blue-800">Go back to home</a>
          </Link>
        </div>
      </div>
    );
  }

  const chapter = chapterData[chapterId || ""];
  if (!chapter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Chapter not found</h2>
          <Link href="/chapters">
            <Button>Back to Chapters</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
          <Link href="/chapters">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapters
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {chapter.title}
          </h1>
          <p className="text-gray-600">
            Complete {chapter.lessons.length} lessons to master these commands
          </p>
          </div>

          <div className="space-y-4">
          {chapter.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {lesson.command}
                        </Badge>
                        {lesson.completed && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <Link href={`/lesson/${lesson.id}`}>
                    <Button>
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {lesson.description}
                </p>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}