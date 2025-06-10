export default function LearningMethods() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Server monitoring dashboard with system metrics" 
                className="rounded-xl shadow-lg w-full h-48 object-cover" 
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-xl"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Learn Commands</h3>
            <p className="text-gray-600 mb-6">
              Bite-sized lessons get to the point. Early lessons get you walking with Linux commands as fast as possible. 
              Later lessons let you go fast, increasing speed and efficiency with advanced concepts.
            </p>
            <div className="text-sm text-blue-600 font-medium">Interactive lessons with real scenarios</div>
          </div>

          <div className="text-center">
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Terminal window showing command line interface with system commands" 
                className="rounded-xl shadow-lg w-full h-48 object-cover" 
              />
              <div className="absolute inset-0 bg-purple-600 bg-opacity-10 rounded-xl"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Practice Commands</h3>
            <p className="text-gray-600 mb-6">
              Focused exercises make concepts stick, building proficiency and agility with real system scenarios, 
              preparing your new Linux command powers for real world tasks.
            </p>
            <div className="text-sm text-purple-600 font-medium">Safe terminal simulation environment</div>
          </div>

          <div className="text-center">
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Analytics dashboard showing performance metrics and progress charts" 
                className="rounded-xl shadow-lg w-full h-48 object-cover" 
              />
              <div className="absolute inset-0 bg-green-600 bg-opacity-10 rounded-xl"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Master Commands</h3>
            <p className="text-gray-600 mb-6">
              Use statistics and achievement tracking to target weak spots, get rapid feedback, reveal progress, 
              and systematically practice to reach mastery, setting commands into muscle memory.
            </p>
            <div className="text-sm text-green-600 font-medium">Statistics and achievement system</div>
          </div>
        </div>
      </div>
    </section>
  );
}
