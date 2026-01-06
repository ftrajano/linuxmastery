export default function Footer() {
  return (
    <footer className="bg-terminal-black text-white py-12 border-t border-terminal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="font-mono text-terminal-green text-xl">
              <span className="text-terminal-green-dim">$</span>
              <span className="text-terminal-green">_</span>
            </div>
            <span className="text-xl font-semibold text-gray-100">LinuxMastery</span>
          </div>

          <div className="flex space-x-8 font-mono text-sm">
            <a href="#" className="text-gray-500 hover:text-terminal-green transition-colors">./contact</a>
            <a href="#" className="text-gray-500 hover:text-terminal-green transition-colors">./blog</a>
            <a href="#" className="text-gray-500 hover:text-terminal-green transition-colors">./privacy</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-terminal-border text-center text-gray-500 font-mono text-sm">
          <p># LinuxMastery 2024 - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
