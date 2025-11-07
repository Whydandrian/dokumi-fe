import { FileText, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Dokumi ITK</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Konversi dokumen cepat dan aman langsung dari browser Anda.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Mulai dengan Mudah
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Tentang
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Konversi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Image to PDF
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Word to PDF
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  PowerPoint to PDF
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  All Tools
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">itsupport@itk.ac.id</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Balikpapan, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2025 Dokumi Institut Teknologi Kalimantan
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
