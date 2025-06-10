export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-lg">
              S
            </div>
            <span className="text-xl font-bold">SysAdminified</span>
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Read our blog</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 SysAdminified. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
