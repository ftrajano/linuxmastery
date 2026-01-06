import { useQuery } from "@tanstack/react-query";

export default function ProgressDashboard() {
  // Mock user ID - in real app this would come from auth
  const userId = 1;

  const { data: stats } = useQuery({
    queryKey: [`/api/users/${userId}/stats`],
    enabled: !!userId,
  });

  const progressStats = [
    {
      value: stats?.totalTime ? `${(stats.totalTime / 1000).toFixed(1)}s` : "0.0s",
      label: "Total Time",
      target: "Get to 300s",
      progress: stats?.totalTime ? Math.min((stats.totalTime / 1000) / 300 * 100, 100) : 0,
      color: "bg-primary"
    },
    {
      value: stats?.fastestTime ? `${(stats.fastestTime / 1000).toFixed(1)}s` : "-",
      label: "Fastest Time",
      target: "Get to 8s",
      progress: stats?.fastestTime ? Math.min(8000 / stats.fastestTime * 100, 100) : 0,
      color: "bg-secondary"
    },
    {
      value: stats?.fewestCommands ? stats.fewestCommands.toString() : "-",
      label: "Fewest Commands",
      target: "Get to 50",
      progress: stats?.fewestCommands ? Math.min(50 / stats.fewestCommands * 100, 100) : 0,
      color: "bg-accent"
    },
    {
      value: stats?.totalLessonsCompleted ? 
        `${(stats.totalTime / 1000 / stats.totalLessonsCompleted).toFixed(1)}s` : "-",
      label: "Average Time",
      target: "Per lesson",
      progress: 0,
      color: "bg-orange-600"
    }
  ];

  const commandGroups = [
    {
      name: "File Navigation",
      commands: ["ls", "cd", "pwd", "touch", "mkdir"],
      percentage: 25,
      color: "stroke-blue-600"
    },
    {
      name: "File Operations",
      commands: ["cp", "mv", "rm", "find"],
      percentage: 50,
      color: "stroke-green-600"
    },
    {
      name: "Text Processing",
      commands: ["cat", "less", "head", "tail", "grep", "wc"],
      percentage: 33,
      color: "stroke-purple-600"
    },
    {
      name: "System Monitoring",
      commands: ["top", "ps", "free", "df"],
      percentage: stats?.topProgress || 0,
      color: "stroke-yellow-600"
    },
    {
      name: "Process Management",
      commands: ["kill", "systemctl"],
      percentage: stats?.systemctlProgress || 0,
      color: "stroke-orange-600"
    },
    {
      name: "Log Analysis",
      commands: ["journalctl"],
      percentage: stats?.journalctlProgress || 0,
      color: "stroke-red-600"
    },
    {
      name: "Network & System",
      commands: ["ping", "wget", "curl", "uname"],
      percentage: 0,
      color: "stroke-indigo-600"
    }
  ];

  return (
    <section className="py-16 bg-terminal-black border-b border-terminal-border" id="progress">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-12">
          <span className="text-terminal-green font-mono">cat</span> ./progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {progressStats.map((stat, index) => (
            <div key={index} className="bg-terminal-dark rounded-lg p-6 border border-terminal-border">
              <div className="text-3xl font-bold text-terminal-green font-mono mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.target}</div>
              <div className="mt-3 bg-terminal-gray rounded-full h-1.5">
                <div
                  className="bg-terminal-green h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-terminal-dark rounded-lg p-8 border border-terminal-border">
          <h3 className="text-xl font-semibold text-gray-100 mb-6">Command Group Mastery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {commandGroups.map((group) => {
              const circumference = 251.2;
              const strokeDashoffset = circumference - (group.percentage / 100) * circumference;

              return (
                <div key={group.name} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#21262d" strokeWidth="8" fill="none"/>
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 stroke-terminal-green"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-terminal-green font-mono">{group.percentage}%</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">{group.name}</h4>
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {group.commands.map((cmd) => (
                      <span key={cmd} className="command-badge text-xs">
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
