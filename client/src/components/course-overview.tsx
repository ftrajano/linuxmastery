import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function CourseOverview() {
  const { data: lessons } = useQuery({
    queryKey: ["/api/lessons"],
  });

  const chapters = [
    {
      id: 1,
      title: "Chapter 1. Process Monitoring Essentials 📊",
      description: "Master top command basics - CPU, memory, and process identification",
      color: "from-blue-50 to-indigo-50 border-blue-100",
      iconColor: "bg-primary",
      lessons: lessons?.filter(l => l.command === "top").length || 0
    },
    {
      id: 2,
      title: "Chapter 2. Text Search Mastery 🔍",
      description: "Advanced grep patterns, regex, and file searching techniques",
      color: "from-purple-50 to-violet-50 border-purple-100",
      iconColor: "bg-secondary",
      lessons: lessons?.filter(l => l.command === "grep").length || 0
    },
    {
      id: 3,
      title: "Chapter 3. Log Analysis Power 📋",
      description: "journalctl filtering, time ranges, and troubleshooting workflows",
      color: "from-green-50 to-emerald-50 border-green-100",
      iconColor: "bg-accent",
      lessons: lessons?.filter(l => l.command === "journalctl").length || 0
    },
    {
      id: 4,
      title: "Chapter 4. Service Management Pro ⚙️",
      description: "systemctl service control, status checking, and automation",
      color: "from-orange-50 to-amber-50 border-orange-100",
      iconColor: "bg-orange-600",
      lessons: lessons?.filter(l => l.command === "systemctl").length || 0
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
            const firstLessonOfChapter = lessons?.find(l => 
              l.command === (chapter.id === 1 ? "top" : 
                           chapter.id === 2 ? "grep" : 
                           chapter.id === 3 ? "journalctl" : "systemctl")
            );
            
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
                        <p className="text-gray-600">{chapter.description}</p>
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
