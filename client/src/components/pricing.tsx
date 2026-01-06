import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section className="py-16 bg-terminal-dark border-b border-terminal-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-8">
          <span className="text-terminal-green font-mono">sudo</span> level-up --lifetime
        </h2>
        <p className="text-xl text-gray-400 mb-12 font-mono">// one-time payment, forever access</p>

        <div className="bg-terminal-black rounded-lg p-8 border border-terminal-border max-w-md mx-auto hover:border-terminal-green/50 transition-colors">
          <div className="text-5xl font-bold text-terminal-green font-mono mb-4">$29</div>
          <div className="text-gray-500 mb-6 font-mono">one-time payment</div>
          <ul className="text-left space-y-3 mb-8 font-mono text-sm">
            <li className="flex items-center text-gray-300">
              <span className="text-terminal-green mr-3">[x]</span>
              45+ interactive lessons
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-terminal-green mr-3">[x]</span>
              Real terminal simulation
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-terminal-green mr-3">[x]</span>
              Progress tracking & achievements
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-terminal-green mr-3">[x]</span>
              Mobile & desktop access
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-terminal-green mr-3">[x]</span>
              Lifetime updates
            </li>
          </ul>
          <Button className="w-full bg-terminal-green-dim text-white py-4 px-8 rounded-lg text-lg font-mono hover:bg-terminal-green border border-terminal-green transition-colors">
            $ start --now
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-4">
          <div className="w-8 h-8 bg-syntax-orange rounded flex items-center justify-center text-terminal-black font-bold text-sm font-mono">
            HN
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-500 font-mono">FEATURED ON</div>
            <div className="font-semibold text-gray-300">Hacker News</div>
          </div>
          <div className="text-2xl font-bold text-syntax-orange font-mono">512</div>
        </div>
      </div>
    </section>
  );
}
