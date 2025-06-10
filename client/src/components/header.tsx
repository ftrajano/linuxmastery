import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg">
              S
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SysAdminified</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#lessons" className="text-gray-600 hover:text-primary transition-colors">Lessons</a>
            <a href="#practice" className="text-gray-600 hover:text-primary transition-colors">Practice</a>
            <a href="#progress" className="text-gray-600 hover:text-primary transition-colors">Progress</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button className="bg-primary text-white hover:bg-blue-700">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
