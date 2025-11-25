'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { forceDownload } from '@/utils/forceDownload';

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [convertedFilename, setConvertedFilename] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Extract filename from URL
  function extractFilename(url: string): string {
    try {
      return url.split('/').pop() || 'download.pdf';
    } catch {
      return 'download.pdf';
    }
  }

  const handleDownload = async () => {
    try {
      await forceDownload(downloadUrl, convertedFilename || 'download.pdf');
    } catch (err) {
      console.error(err);
      alert("Gagal mendownload file");
    }
  };

  async function handleCompress() {
    if (!file) return;

    setLoading(true);
    setError('');
    setDownloadUrl('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(
        'http://127.0.0.1:5001/docs/api/tools/compress-pdf',
        {
          method: 'POST',
          body: formData,
        }
      );

      const contentType = res.headers.get('Content-Type') || '';

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Gagal mengompres PDF');
      }

      // Jika server return PDF langsung
      if (contentType.includes('application/pdf')) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setConvertedFilename('compressed.pdf');
        return;
      }

      // Jika server return JSON
      if (contentType.includes('application/json')) {
        const json = await res.json();

        if (json.download_url) {
          setDownloadUrl(json.download_url);

          // Ambil nama file dari URL
          const filename = extractFilename(json.download_url);
          setConvertedFilename(filename);
        }

        return;
      }

      throw new Error('Format response server tidak dikenali.');

    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setError('');

    if (downloadUrl.startsWith("blob:")) {
      URL.revokeObjectURL(downloadUrl);
    }

    setDownloadUrl('');
    setConvertedFilename('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="pt-16 md:pt-20">
        <section className="py-16 md:py-24 bg-white">
          <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Kompres PDF</h1>

            <p className="text-gray-600 mb-6">
              Unggah file PDF Anda untuk diperkecil ukurannya secara otomatis.
            </p>

            {/* Input sebelum hasil */}
            {!downloadUrl && (
              <div className="space-y-4">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm border border-gray-300 rounded-lg p-2"
                />

                <Button
                  onClick={handleCompress}
                  disabled={!file || loading}
                  className="w-full"
                >
                  {loading ? 'Mengompres...' : 'Mulai Kompres'}
                </Button>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="mt-6 flex justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="mt-6 text-center text-red-600 font-medium">
                {error}
              </p>
            )}

            {/* Hasil download */}
            {downloadUrl && (
              <div className="mt-10 text-center space-y-6">
                <Button
                  onClick={handleDownload}
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Download: {convertedFilename}
                </Button>

                <Button
                  variant="secondary"
                  className="w-full md:w-auto"
                  onClick={handleReset}
                >
                  Reset Form
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
