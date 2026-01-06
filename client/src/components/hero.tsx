import InteractiveTerminal from "./interactive-terminal";
import { useQuery } from "@tanstack/react-query";

export default function Hero() {
  const { data: lessons } = useQuery({
    queryKey: ["/api/lessons"],
  });

  const firstLesson = lessons?.[0];

  return (
    <section className="bg-terminal-black py-16 border-b border-terminal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-100 mb-6">
          <span className="text-terminal-green">$</span> Master Linux Commands
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto font-mono">
          Learn essential Linux commands from file navigation to system administration before you jump into orchestration.
        </p>
        <p className="text-terminal-green font-mono mb-8">
          &gt; Start with an interactive lesson below_
        </p>
        {firstLesson && (
          <div className="bg-terminal-dark rounded-xl border border-terminal-border p-8 max-w-4xl mx-auto shadow-terminal-glow">
            <InteractiveTerminal lesson={firstLesson} showStats={true} />
          </div>
        )}
      </div>
    </section>
  );
}
