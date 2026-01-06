import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function CourseOverview() {
  const { data: lessons } = useQuery({
    queryKey: ["/api/lessons"],
  });

  const chapters = [
    {
      id: 1,
      title: "Chapter 1. File Navigation Essentials",
      description: "Master basic file and directory operations - ls, cd, pwd, touch, mkdir",
      lessons: lessons?.filter(l => l.chapter === 1).length || 0,
      commands: ["ls", "cd", "pwd", "touch", "mkdir"]
    },
    {
      id: 2,
      title: "Chapter 2. File Operations",
      description: "Copy, move, delete, and search files - cp, mv, rm, find",
      lessons: lessons?.filter(l => l.chapter === 2).length || 0,
      commands: ["cp", "mv", "rm", "find"]
    },
    {
      id: 3,
      title: "Chapter 3. Text Processing",
      description: "View, search, and analyze text files - cat, less, head, tail, grep, wc",
      lessons: lessons?.filter(l => l.chapter === 3).length || 0,
      commands: ["cat", "less", "head", "tail", "grep", "wc"]
    },
    {
      id: 4,
      title: "Chapter 4. System Monitoring",
      description: "Monitor processes, memory, and disk usage - top, ps, free, df",
      lessons: lessons?.filter(l => l.chapter === 4).length || 0,
      commands: ["top", "ps", "free", "df"]
    },
    {
      id: 5,
      title: "Chapter 5. Process & Service Management",
      description: "Control processes and services - kill, systemctl",
      lessons: lessons?.filter(l => l.chapter === 5).length || 0,
      commands: ["kill", "systemctl"]
    },
    {
      id: 6,
      title: "Chapter 6. Log Analysis",
      description: "Analyze system logs and troubleshoot issues - journalctl",
      lessons: lessons?.filter(l => l.chapter === 6).length || 0,
      commands: ["journalctl"]
    },
    {
      id: 7,
      title: "Chapter 7. Network & System Info",
      description: "Network testing and system information - ping, wget, curl, uname",
      lessons: lessons?.filter(l => l.chapter === 7).length || 0,
      commands: ["ping", "wget", "curl", "uname"]
    }
  ];

  return (
    <section className="py-16 bg-terminal-dark border-y border-terminal-border" id="lessons">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-4">
          <span className="text-terminal-green font-mono">ls</span> ./chapters
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Bite-sized lessons get to the point. Early lessons get you walking with these commands as fast as possible.
          Later lessons let you go fast, increasing speed and efficiency with advanced concepts.
        </p>

        <div className="space-y-4">
          {chapters.map((chapter) => {
            const firstLessonOfChapter = lessons?.find(l => l.chapter === chapter.id);

            return (
              <Link
                key={chapter.id}
                href={firstLessonOfChapter ? `/lesson/${firstLessonOfChapter.id}` : "#"}
              >
                <div className="bg-terminal-black rounded-lg p-5 border border-terminal-border hover:border-terminal-green/50 hover:shadow-terminal-glow transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-terminal-gray text-terminal-green rounded border border-terminal-border flex items-center justify-center font-mono font-semibold group-hover:bg-terminal-green-dim group-hover:text-white transition-colors">
                        {chapter.id}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-100 group-hover:text-terminal-green transition-colors">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">{chapter.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {chapter.commands.map((cmd) => (
                            <span key={cmd} className="command-badge text-xs">
                              {cmd}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      <span className="text-terminal-amber">{chapter.lessons}</span> lesson{chapter.lessons !== 1 ? 's' : ''}
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
