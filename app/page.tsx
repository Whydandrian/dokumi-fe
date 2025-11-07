'use client';

import {
  FileImage,
  FileText,
  Presentation,
  Zap,
  Shield,
  Cloud,
  Smartphone,
  ArrowRight,
  FileScan,
} from 'lucide-react';
import Header from '@/components/Header';
import ConversionCard from '@/components/ConversionCard';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="pt-16 md:pt-20">
        <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/50" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2LTJoLTJ2Mmgyem0wLTR2LTJoLTJ2Mmgyem0yLTRoMnYtMmgtMnYyem0wIDBoLTJ2Mmgydi0yem0yIDJ2Mmgydi0yaC0yem0wIDB2LTJoMnYtMmgtMnYyaC0ydjJoMnptLTIgMmgtMnYyaDJ2LTJ6bTItMmgydi0yaC0ydjJ6bTAgMGgydjJoLTJ2LTJ6bTAgMmgtMnYyaDJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Cepat & Aman
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Ubah Dokumen Anda
                <span className="block bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent mt-2">
                  dalam Hitungan Detik
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                Ubah gambar, dokumen Word, dan presentasi PowerPoint menjadi format PDF dengan platform kami yang cepat, aman, dan mudah digunakan.
              </p>

              <Button
                size="lg"
                className="bg-primary hover:bg-blue-700 shadow-xl text-base md:text-lg px-8 py-6 h-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300"
              >
                Ubah Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <ConversionCard
                title="Image to PDF"
                description="Ubah gambar apa pun menjadi file PDF"
                icon={<FileImage className="w-7 h-7 text-white" />}
                acceptedFormats=".jpg,.jpeg,.png,.gif,.bmp,.webp"
              />
              <ConversionCard
                title="Word to PDF"
                description="Konversi dokumen Anda menjadi PDF"
                icon={<FileText className="w-7 h-7 text-white" />}
                acceptedFormats=".doc,.docx"
              />
              <ConversionCard
                title="PowerPoint to PDF"
                description="Konversi PowerPoint Anda ke PDF"
                icon={<Presentation className="w-7 h-7 text-white" />}
                acceptedFormats=".ppt,.pptx"
              />
              <ConversionCard
                title="OCR"
                description="Ekstrak teks dari gambar & dokumen"
                icon={<FileScan className="w-7 h-7 text-white" />}
                acceptedFormats=".jpg,.jpeg,.png,.pdf"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Mengapa {' '}
                <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                  Dokumi ITK
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Platform Institut Teknologi Kalimantan untuk konversi dokumen yang cepat, aman, dan andal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <FeatureCard
                icon={Zap}
                title="Transformasi Cepat"
                description="Konversi dokumen dalam hitungan detik tanpa mengorbankan kualitas"
              />
              <FeatureCard
                icon={Shield}
                title="100% Aman"
                description="Keamanan terjamin karena tidak keluar dari sistem ITK"
              />
              <FeatureCard
                icon={Cloud}
                title="Berbasis Cloud"
                description="Akses dari mana saja tanpa perlu instalasi"
              />
              <FeatureCard
                icon={Smartphone}
                title="Responsif"
                description="Desain yang dioptimalkan untuk semua perangkat"
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Cara Mudah Memulai
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ikuti tiga langkah sederhana untuk mengubah dokumen Anda menjadi PDF
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-blue-700 rounded-full mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    1
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Unggah Dokumen
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Pilih file gambar, Word, atau PowerPoint yang ingin Anda ubah
                </p>
              </div>

              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-blue-700 rounded-full mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    2
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Konversi dengan Satu Klik
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tekan tombol konversi dan biarkan sistem kami yang bekerja
                </p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-blue-700 rounded-full mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    3
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Unduh PDF Anda
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Simpan file PDF yang telah dikonversi ke perangkat Anda
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Tentang{' '}
                  <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                    Dokumi ITK
                  </span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    Dokumi ITK adalah platform internal yang dirancang khusus untuk staff ITK guna memudahkan proses konversi file Word, PowerPoint, dan gambar menjadi format PDF. Platform ini sangat berguna terutama untuk mengamankan dokumen yang mengandung informasi rahasia atau sensitif, sehingga file yang dikonversi tetap terjaga kerahasiaannya.
                  </p>
                  <p>
                    Dengan antarmuka yang cepat, aman, dan mudah digunakan, Dokumi ITK membantu staf dalam mengelola dan mengubah file dokumen ke format PDF tanpa khawatir terhadap kebocoran data atau penyalahgunaan informasi.
                  </p>
                </div>
                {/* <Button
                  size="lg"
                  className="mt-8 bg-primary hover:bg-blue-700 shadow-lg"
                >
                  Learn More About Us
                </Button> */}
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-700/20 rounded-3xl transform rotate-3" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          Konversi Cepat
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Hasil dalam hitungan detik
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          100% Aman
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Privasi Anda adalah prioritas kami
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Cloud className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          Akses Dimana Saja
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Gunakan di perangkat apa pun tanpa instalasi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Siap untuk Mengubah Dokumen Anda?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              Mulailah menggunakan Dokumi ITK hari ini dan nikmati kemudahan konversi dokumen yang cepat, aman, dan andal.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 shadow-xl text-base md:text-lg px-8 py-6 h-auto"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
