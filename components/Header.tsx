'use client';

import { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center mr-10">
              <Image
                src="/images/Logo_ITK.webp"
                alt="Dokumi Logo"
                width={24}
                height={24}
                className="absolute w-24"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Dokumi ITK
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Fitur
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Mulai dengan Mudah
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Tentang
            </a>
            <Button className="bg-primary hover:bg-blue-700 shadow-lg">
              Mulai Sekarang
            </Button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-4 space-y-3">
            <a
              href="#features"
              className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#about"
              className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Button className="w-full bg-primary hover:bg-blue-700 shadow-lg">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
