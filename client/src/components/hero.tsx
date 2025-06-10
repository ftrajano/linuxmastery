import InteractiveTerminal from "./interactive-terminal";
import { useQuery } from "@tanstack/react-query";

export default function Hero() {
  const { data: lessons } = useQuery({
    queryKey: ["/api/lessons"],
  });

  const firstLesson = lessons?.[0];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Master Linux System Commands
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Learn top, grep, journalctl, and systemctl before you jump into orchestration.
          Start with an interactive lesson below.
        </p>
        {firstLesson && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <InteractiveTerminal lesson={firstLesson} showStats={true} />
          </div>
        )}
      </div>
    </section>
  );
}
