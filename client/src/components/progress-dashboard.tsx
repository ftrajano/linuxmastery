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

  const commands = [
    {
      name: "top",
      description: "Process monitoring",
      percentage: stats?.topProgress || 0,
      color: "stroke-primary"
    },
    {
      name: "grep",
      description: "Text searching",
      percentage: stats?.grepProgress || 0,
      color: "stroke-secondary"
    },
    {
      name: "journalctl",
      description: "Log analysis",
      percentage: stats?.journalctlProgress || 0,
      color: "stroke-accent"
    },
    {
      name: "systemctl",
      description: "Service management",
      percentage: stats?.systemctlProgress || 0,
      color: "stroke-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white" id="progress">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Your Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {progressStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.target}</div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className={`${stat.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Command Mastery Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commands.map((command) => {
              const circumference = 251.2;
              const strokeDashoffset = circumference - (command.percentage / 100) * circumference;
              
              return (
                <div key={command.name} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none"/>
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        strokeWidth="8" 
                        fill="none" 
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className={`transition-all duration-300 ${command.color}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{command.percentage}%</span>
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-gray-900 mb-1">{command.name}</h4>
                  <p className="text-sm text-gray-600">{command.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
