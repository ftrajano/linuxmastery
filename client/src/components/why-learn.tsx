export default function WhyLearn() {
  return (
    <section className="py-16 bg-terminal-dark border-y border-terminal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-12">
          <span className="text-terminal-green font-mono">man</span> linuxmastery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-terminal-black rounded-lg border border-terminal-border">
            <div className="text-terminal-green font-mono text-2xl mb-4">&gt;_</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Essential.</h3>
            <p className="text-gray-400">
              These commands form the foundation of Linux system administration. Master them before diving into complex orchestration tools.
            </p>
          </div>

          <div className="text-center p-6 bg-terminal-black rounded-lg border border-terminal-border">
            <div className="text-terminal-amber font-mono text-2xl mb-4">#!/bin</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Practical.</h3>
            <p className="text-gray-400">
              Debug production issues, monitor system health, analyze logs, and manage services - skills you'll use daily as a systems engineer.
            </p>
          </div>

          <div className="text-center p-6 bg-terminal-black rounded-lg border border-terminal-border">
            <div className="text-syntax-purple font-mono text-2xl mb-4">--help</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Focused.</h3>
            <p className="text-gray-400">
              Learn the most important flags and use cases for each command through targeted exercises that build real-world muscle memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
