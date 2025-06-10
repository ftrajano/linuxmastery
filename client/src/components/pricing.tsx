import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Learn Linux Commands. Practice Daily. Master System Administration.
        </h2>
        <p className="text-xl text-gray-600 mb-12">Lifetime Access.</p>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200 max-w-md mx-auto">
          <div className="text-5xl font-bold text-primary mb-4">$29</div>
          <div className="text-gray-600 mb-6">One-time payment</div>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              45+ interactive lessons
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              Real terminal simulation
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              Progress tracking & achievements
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              Mobile & desktop access
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              Lifetime updates
            </li>
          </ul>
          <Button className="w-full bg-primary text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Start Learning Now
          </Button>
        </div>
        
        <div className="mt-12 flex items-center justify-center space-x-4">
          <div className="text-orange-500">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-sm">
              HN
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">FEATURED ON</div>
            <div className="font-semibold text-gray-900">Hacker News</div>
          </div>
          <div className="text-2xl font-bold text-orange-500">512</div>
        </div>
      </div>
    </section>
  );
}
