'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown, BookOpen, Layout, FileText, Code, Activity, HelpCircle, AtSign, Users, Award, Wrench, FileImage, FileScan, Code2, Minimize2, Minimize, Combine, SquareSplitHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="flex items-center justify-center mr-2"
            >
              <Image
                src="/images/Logo_ITK.webp"
                alt="Dokumi Logo"
                width={96}
                height={96}
                className="w-24"
              />
            </a>
            <a href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Dokumi ITK
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Home
            </a>

            <div 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="px-3 py-2 text-sm text-gray-700 hover:text-primary transition-colors font-medium flex items-center gap-1">
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMegaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[705px] bg-white rounded-lg shadow-xl border border-gray-200">
                  <div className="grid grid-cols-5 gap-0">
                    <div className="col-span-3 p-4">
                      <div className="grid grid-cols-2 gap-1">
                        <div>
                          <span className="block ml-2 mb-3 font-semibold text-xs uppercase text-gray-800">
                            Alat PDF
                          </span>
                          <div className="space-y-1">
                            <a href="/tools/word-to-pdf" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <FileText className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">Word to PDF</p>
                              </div>
                            </a>
                            <a href="/tools/powerpoint-to-pdf" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Layout className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">PPT to PDF</p>
                              </div>
                            </a>
                            <a href="/tools/image-to-pdf" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <FileImage className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">Image to PDF</p>
                              </div>
                            </a>
                            <a href="/tools/compress-pdf" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Minimize className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">Kompres PDF</p>
                              </div>
                            </a>
                            <a href="/tools/merge-pdf" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Combine className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">Merge PDF</p>
                              </div>
                            </a>
                            <a href="/tools/split-pdf" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <SquareSplitHorizontal className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">Split PDF</p>
                              </div>
                            </a>
                          </div>
                        </div>

                        <div>
                          <span className="block ml-2 mb-3 font-semibold text-xs uppercase text-gray-800">
                            Ekstraktor
                          </span>
                          <div className="space-y-1">
                            <a href="/tools/ocr" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <FileScan className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">OCR Pdf to Text</p>
                              </div>
                            </a>
                          </div>

                          <span className="block ml-2 mt-6 mb-3 font-semibold text-xs uppercase text-gray-800">
                            Integrasi
                          </span>
                          <div className="space-y-1">
                            <a href="#" className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Code2 className="w-4 h-4 mt-0.5 text-gray-800 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-800">Dokumi API</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 bg-gray-50 p-4 rounded-br-lg">
                      <span className="block mb-3 font-semibold text-xs uppercase text-gray-800">
                        Dokumi ITK
                      </span>
                      <a href="#home" className="group block">
                        <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-800 mb-3">
                          Dokumi ITK adalah platform konversi file yang mudah digunakan. Konversi file Word, PowerPoint, dan gambar ke PDF dengan cepat dan aman.
                        </p>
                        <p className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium group-hover:underline">
                          Konversi Sekarang
                          <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Langkah
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
              Fitur
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Langkah
            </a>
            <a
              href="#about"
              className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </a>
            <Button className="w-full bg-primary hover:bg-blue-700 shadow-lg">
              Mulai Sekarang
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
