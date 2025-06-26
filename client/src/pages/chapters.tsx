import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/header";

interface Lesson {
  id: number;
  title: string;
  description: string;
  command: string;
  completed: boolean;
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1. File Navigation Essentials 🔥",
    description: "Learn to navigate the filesystem",
    icon: "📁",
    lessons: [
      { id: 1, title: "List Directory Contents", description: "Learn to view files and directories using ls command", command: "ls", completed: false },
      { id: 2, title: "Navigate Directories", description: "Change directories and navigate the filesystem", command: "cd", completed: false },
      { id: 3, title: "Show Current Directory", description: "Display the full path of your current directory", command: "pwd", completed: false },
      { id: 4, title: "Create Files", description: "Create new empty files quickly", command: "touch", completed: false },
      { id: 5, title: "Create Directories", description: "Make new directories in the filesystem", command: "mkdir", completed: false }
    ]
  },
  {
    id: 2,
    title: "Chapter 2. File Operations ❤️",
    description: "Master file manipulation",
    icon: "📄",
    lessons: [
      { id: 6, title: "Copy Files", description: "Duplicate files and directories", command: "cp", completed: false },
      { id: 7, title: "Move and Rename", description: "Move files between directories or rename them", command: "mv", completed: false },
      { id: 8, title: "Remove Files", description: "Delete files and directories safely", command: "rm", completed: false },
      { id: 9, title: "Find Files", description: "Search for files and directories by various criteria", command: "find", completed: false }
    ]
  },
  {
    id: 3,
    title: "Chapter 3. Text Processing 🪄",
    description: "Process text files efficiently",
    icon: "📝",
    lessons: [
      { id: 10, title: "View File Contents", description: "Display the entire contents of text files", command: "cat", completed: false },
      { id: 11, title: "Page Through Files", description: "View large files one page at a time", command: "less", completed: false },
      { id: 12, title: "Show File Beginning", description: "Display the first lines of a file", command: "head", completed: false },
      { id: 13, title: "Show File End", description: "Display the last lines of a file", command: "tail", completed: false },
      { id: 14, title: "Search Text", description: "Find specific patterns in files and output", command: "grep", completed: false },
      { id: 15, title: "Count Words", description: "Count lines, words, and characters in files", command: "wc", completed: false }
    ]
  },
  {
    id: 4,
    title: "Chapter 4. System Monitoring 🚀",
    description: "Monitor system resources",
    icon: "📊",
    lessons: [
      { id: 16, title: "Monitor Processes", description: "View running processes and system resource usage", command: "top", completed: false },
      { id: 17, title: "List Processes", description: "Show detailed information about running processes", command: "ps", completed: false },
      { id: 18, title: "Check Memory Usage", description: "Display memory usage information", command: "free", completed: false },
      { id: 19, title: "Check Disk Space", description: "Display filesystem disk space usage", command: "df", completed: false }
    ]
  },
  {
    id: 5,
    title: "Chapter 5. Process Management 🏎️",
    description: "Control processes and services",
    icon: "⚙️",
    lessons: [
      { id: 20, title: "Terminate Processes", description: "Stop processes by their process ID", command: "kill", completed: false },
      { id: 21, title: "Service Status", description: "Check and control system services", command: "systemctl", completed: false },
      { id: 22, title: "Restart Services", description: "Restart system services", command: "systemctl", completed: false }
    ]
  },
  {
    id: 6,
    title: "Chapter 6. Log Analysis 🏔️",
    description: "Analyze system logs",
    icon: "📋",
    lessons: [
      { id: 23, title: "View System Logs", description: "Query and analyze system logs using journalctl", command: "journalctl", completed: false },
      { id: 24, title: "Filter Service Logs", description: "View logs for specific services", command: "journalctl", completed: false },
      { id: 25, title: "Follow Live Logs", description: "Monitor logs in real-time", command: "journalctl", completed: false }
    ]
  },
  {
    id: 7,
    title: "Chapter 7. Network & System Info 🔎",
    description: "Network tools and system information",
    icon: "🌐",
    lessons: [
      { id: 26, title: "Test Network Connectivity", description: "Check if a remote host is reachable", command: "ping", completed: false },
      { id: 27, title: "Download Files", description: "Download files from the internet", command: "wget", completed: false },
      { id: 28, title: "Transfer Data", description: "Make HTTP requests and transfer data", command: "curl", completed: false },
      { id: 29, title: "Show System Information", description: "Display system and kernel information", command: "uname", completed: false }
    ]
  }
];

export default function ChaptersPage() {
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

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="h-screen bg-gray-50 overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="max-w-6xl mx-auto px-4 py-8 h-full overflow-hidden">
          <div className="max-w-4xl mx-auto h-full overflow-hidden">
            <Accordion type="single" collapsible className="w-full space-y-4 overflow-hidden">
                {chapters.map((chapter) => {
                  
                  return (
                    <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`} className="border border-gray-200 rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-6 py-6 hover:no-underline bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between w-full">
                          <div className="text-2xl font-bold text-left text-gray-900">{chapter.title}</div>
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-400" fill="currentColor">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                          </svg>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pb-0">
                        <div className="bg-gray-50">
                          <div className="overflow-hidden">
                            <div className="divide-y divide-gray-100">
                              {chapter.lessons.map((lesson) => (
                                <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                                  <div className="px-6 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-start gap-4 flex-1">
                                        <div className="text-base font-medium text-gray-900 min-w-[160px]">
                                          {lesson.title}
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-sm text-gray-600">
                                            {lesson.description}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 ml-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                          <div className="w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                          <div className="w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                          <div className="w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}