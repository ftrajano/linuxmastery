export default function LearningMethods() {
  return (
    <section className="py-16 bg-terminal-black border-b border-terminal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-terminal-dark rounded-lg border border-terminal-border p-8 text-center hover:border-terminal-green/30 transition-colors">
            <div className="mb-6 w-16 h-16 mx-auto bg-terminal-gray rounded-lg flex items-center justify-center border border-terminal-border">
              <span className="text-terminal-green font-mono text-2xl">&gt;</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Learn Commands</h3>
            <p className="text-gray-400 mb-6">
              Bite-sized lessons get to the point. Early lessons get you walking with Linux commands as fast as possible.
              Later lessons let you go fast, increasing speed and efficiency with advanced concepts.
            </p>
            <div className="text-sm text-terminal-green font-mono">./interactive-lessons</div>
          </div>

          <div className="bg-terminal-dark rounded-lg border border-terminal-border p-8 text-center hover:border-terminal-amber/30 transition-colors">
            <div className="mb-6 w-16 h-16 mx-auto bg-terminal-gray rounded-lg flex items-center justify-center border border-terminal-border">
              <span className="text-terminal-amber font-mono text-2xl">$</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Practice Commands</h3>
            <p className="text-gray-400 mb-6">
              Focused exercises make concepts stick, building proficiency and agility with real system scenarios,
              preparing your new Linux command powers for real world tasks.
            </p>
            <div className="text-sm text-terminal-amber font-mono">./safe-simulation</div>
          </div>

          <div className="bg-terminal-dark rounded-lg border border-terminal-border p-8 text-center hover:border-syntax-purple/30 transition-colors">
            <div className="mb-6 w-16 h-16 mx-auto bg-terminal-gray rounded-lg flex items-center justify-center border border-terminal-border">
              <span className="text-syntax-purple font-mono text-2xl">#</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Master Commands</h3>
            <p className="text-gray-400 mb-6">
              Use statistics and achievement tracking to target weak spots, get rapid feedback, reveal progress,
              and systematically practice to reach mastery, setting commands into muscle memory.
            </p>
            <div className="text-sm text-syntax-purple font-mono">./track-progress</div>
          </div>
        </div>
      </div>
    </section>
  );
}
