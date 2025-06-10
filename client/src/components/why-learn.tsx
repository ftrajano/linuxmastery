export default function WhyLearn() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Master These Commands?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential.</h3>
            <p className="text-gray-600">
              These four commands form the foundation of Linux system administration. Master them before diving into complex orchestration tools.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Practical.</h3>
            <p className="text-gray-600">
              Debug production issues, monitor system health, analyze logs, and manage services - skills you'll use daily as a systems engineer.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Focused.</h3>
            <p className="text-gray-600">
              Learn the most important flags and use cases for each command through targeted exercises that build real-world muscle memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
