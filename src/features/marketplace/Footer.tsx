import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-gray-400 text-sm">
              The next generation decentralized exchange platform for seamless trading and liquidity provision.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-white text-sm">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://twitter.com/freobus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.gg/freobus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://github.com/freobus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} FreoBus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 