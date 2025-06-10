import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function CourseOverview() {
  const { data: lessons } = useQuery({
    queryKey: ["/api/lessons"],
  });

  const chapters = [
    {
      id: 1,
      title: "Chapter 1. File Navigation Essentials 📁",
      description: "Master basic file and directory operations - ls, cd, pwd, touch, mkdir",
      color: "from-blue-50 to-indigo-50 border-blue-100",
      iconColor: "bg-primary",
      lessons: lessons?.filter(l => l.chapter === 1).length || 0,
      commands: ["ls", "cd", "pwd", "touch", "mkdir"]
    },
    {
      id: 2,
      title: "Chapter 2. File Operations 📄",
      description: "Copy, move, delete, and search files - cp, mv, rm, find",
      color: "from-green-50 to-emerald-50 border-green-100",
      iconColor: "bg-accent",
      lessons: lessons?.filter(l => l.chapter === 2).length || 0,
      commands: ["cp", "mv", "rm", "find"]
    },
    {
      id: 3,
      title: "Chapter 3. Text Processing 📝",
      description: "View, search, and analyze text files - cat, less, head, tail, grep, wc",
      color: "from-purple-50 to-violet-50 border-purple-100",
      iconColor: "bg-secondary",
      lessons: lessons?.filter(l => l.chapter === 3).length || 0,
      commands: ["cat", "less", "head", "tail", "grep", "wc"]
    },
    {
      id: 4,
      title: "Chapter 4. System Monitoring 📊",
      description: "Monitor processes, memory, and disk usage - top, ps, free, df",
      color: "from-yellow-50 to-amber-50 border-yellow-100",
      iconColor: "bg-yellow-600",
      lessons: lessons?.filter(l => l.chapter === 4).length || 0,
      commands: ["top", "ps", "free", "df"]
    },
    {
      id: 5,
      title: "Chapter 5. Process & Service Management ⚙️",
      description: "Control processes and services - kill, systemctl",
      color: "from-orange-50 to-red-50 border-orange-100",
      iconColor: "bg-orange-600",
      lessons: lessons?.filter(l => l.chapter === 5).length || 0,
      commands: ["kill", "systemctl"]
    },
    {
      id: 6,
      title: "Chapter 6. Log Analysis 📋",
      description: "Analyze system logs and troubleshoot issues - journalctl",
      color: "from-red-50 to-pink-50 border-red-100",
      iconColor: "bg-red-600",
      lessons: lessons?.filter(l => l.chapter === 6).length || 0,
      commands: ["journalctl"]
    },
    {
      id: 7,
      title: "Chapter 7. Network & System Info 🌐",
      description: "Network testing and system information - ping, wget, curl, uname",
      color: "from-indigo-50 to-purple-50 border-indigo-100",
      iconColor: "bg-indigo-600",
      lessons: lessons?.filter(l => l.chapter === 7).length || 0,
      commands: ["ping", "wget", "curl", "uname"]
    }
  ];

  return (
    <section className="py-16 bg-white" id="lessons">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Take a Peek</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Bite-sized lessons get to the point. Early lessons get you walking with these commands as fast as possible. 
          Later lessons let you go fast, increasing speed and efficiency with advanced concepts.
        </p>
        
        <div className="space-y-6">
          {chapters.map((chapter) => {
            const firstLessonOfChapter = lessons?.find(l => l.chapter === chapter.id);
            
            return (
              <Link 
                key={chapter.id} 
                href={firstLessonOfChapter ? `/lesson/${firstLessonOfChapter.id}` : "#"}
              >
                <div className={`bg-gradient-to-r ${chapter.color} rounded-xl p-6 border hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${chapter.iconColor} text-white rounded-lg flex items-center justify-center font-bold`}>
                        {chapter.id}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{chapter.title}</h3>
                        <p className="text-gray-600 mb-2">{chapter.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {chapter.commands.map((cmd) => (
                            <span key={cmd} className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-white bg-opacity-50 text-gray-700">
                              {cmd}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {chapter.lessons} lesson{chapter.lessons !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
