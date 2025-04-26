'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import '@fontsource/inter';

export default function Home() {
  const [activeTab, setActiveTab] = useState('users');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="min-h-screen bg-[#1E1E1E] text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 md:px-8 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
          <div>
            <Link href="/" className="text-2xl font-bold">FreoBus</Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-[#6F3AFF] transition-colors">Home</Link>
            <Link href="/discover" className="hover:text-[#6F3AFF] transition-colors">Discover Hub</Link>
            <Link href="/wallet" className="hover:text-[#6F3AFF] transition-colors">FreoWallet</Link>
          </nav>
        </div>
        
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#6F3AFF] to-[#00F0FF]">
            Your Gateway to Web3
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Discover, connect, and earn across dApps—no wallet pop-ups, no jargon.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/explore">
              <button className="px-8 py-3 bg-gradient-to-r from-[#6F3AFF] to-[#00F0FF] rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Explore dApps
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="px-8 py-3 border-2 border-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                See How It Works
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "📌",
              title: "One-Click Access",
              description: "FreoWallet connects you instantly—approve once, explore forever."
            },
            {
              icon: "🏆",
              title: "Curated Web3 Apps",
              description: "Only the best dApps, handpicked for you."
            },
            {
              icon: "🌟",
              title: "Web2 Familiarity",
              description: "Feels like your favorite app store."
            }
          ].map((card, index) => (
            <div
              key={index}
              className="p-6 bg-[#2A2A2A] rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-4xl mb-4 transition-transform hover:scale-110">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Demo Section - Simplified */}
      <section className="py-20 px-4 md:px-8 bg-[#2A2A2A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#6F3AFF] to-[#00F0FF]">
            See FreoWallet Auto-Connect
          </h2>
          <div className="aspect-video bg-[#1E1E1E] rounded-xl overflow-hidden relative group">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-xl text-gray-400">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience-Specific CTAs */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            {['users', 'investors', 'developers'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-2 mx-2 transition-all duration-300 hover:scale-105 ${
                  activeTab === tab ? 'border-b-2 border-[#6F3AFF]' : 'hover:text-[#6F3AFF]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="text-center">
            {activeTab === 'users' && (
              <>
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#6F3AFF] to-[#00F0FF]">
                  Ready to Explore?
                </h2>
                <Link href="/explore">
                  <button className="px-8 py-3 bg-[#6F3AFF] rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                    Explore dApps
                  </button>
                </Link>
              </>
            )}
            {activeTab === 'investors' && (
              <>
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#6F3AFF] to-[#00F0FF]">
                  FreoBus is onboarding the next 100M to Web3
                </h2>
                <Link href="/pitch-deck">
                  <button className="px-8 py-3 bg-[#6F3AFF] rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                    View Pitch Deck
                  </button>
                </Link>
              </>
            )}
            {activeTab === 'developers' && (
              <>
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#6F3AFF] to-[#00F0FF]">
                  Build With Us
                </h2>
                <Link href="/submit-app">
                  <button className="px-8 py-3 bg-[#6F3AFF] rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                    Submit Your App
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer - Simplified */}
      <footer className="bg-[#2A2A2A] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Users</h3>
            <ul className="space-y-2">
              <li><Link href="/wallet" className="hover:text-[#6F3AFF] transition-colors">Get FreoWallet</Link></li>
              <li><Link href="/tutorials" className="hover:text-[#6F3AFF] transition-colors">Tutorials</Link></li>
              <li><Link href="/support" className="hover:text-[#6F3AFF] transition-colors">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Investors</h3>
            <ul className="space-y-2">
              <li><Link href="/team" className="hover:text-[#6F3AFF] transition-colors">Team</Link></li>
              <li><Link href="/roadmap" className="hover:text-[#6F3AFF] transition-colors">Roadmap</Link></li>
              <li><Link href="/contact" className="hover:text-[#6F3AFF] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Developers</h3>
            <ul className="space-y-2">
              <li><Link href="/api-docs" className="hover:text-[#6F3AFF] transition-colors">API Docs</Link></li>
              <li><Link href="/submit-app" className="hover:text-[#6F3AFF] transition-colors">Submit App</Link></li>
              <li><Link href="/github" className="hover:text-[#6F3AFF] transition-colors">GitHub</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#6F3AFF] transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#6F3AFF] rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </main>
  );
} 