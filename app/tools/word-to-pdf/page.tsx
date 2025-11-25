'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { forceDownload } from '@/utils/forceDownload';

export default function ConvertDocToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [convertedFilename, setConvertedFilename] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDownload = async () => {
    try {
      await forceDownload(downloadUrl, convertedFilename || "download.pdf");
    } catch (err) {
      console.error(err);
      alert("Gagal mendownload file");
    }
  };

  async function handleConvert() {
    if (!file) return;

    setLoading(true);
    setError("");
    setDownloadUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:5001/docs/api/tools/convert-doc-to-pdf", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("Content-Type") || "";

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Gagal melakukan konversi.");
      }

      // Jika server mengirim PDF langsung
      if (contentType.includes("application/pdf")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        return;
      }

      // Jika server mengembalikan JSON
      if (contentType.includes("application/json")) {
        const json = await res.json();

        if (json.download_url) {
          setDownloadUrl(json.download_url);
        }

        if (json.converted_filename) {
          setConvertedFilename(json.converted_filename);
        }

        return;
      }

      throw new Error("Response tidak dikenali dari server.");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /** RESET FORM */
  function handleReset() {
    setFile(null);
    setError("");
    setDownloadUrl("");

    // Hapus blob URL agar tidak menumpuk memory
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="pt-16 md:pt-20">
        <section id="home" className="py-16 md:py-24 bg-white">
          <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Convert Document to PDF</h1>

            <p className="text-gray-600 mb-4">
              Unggah file Word/Docx untuk dikonversi menjadi PDF.
            </p>

            {/* Input file */}
            {!downloadUrl && (
              <div className="space-y-4">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx,.odt,.rtf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm border border-gray-300 rounded-lg p-2"
                />

                <Button
                  onClick={handleConvert}
                  disabled={!file || loading}
                  className="w-full"
                >
                  {loading ? "Processing..." : "Convert to PDF"}
                </Button>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="mt-6 flex justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="mt-6 text-red-500 font-medium text-center">{error}</p>
            )}

            {/* Download Section */}
            {downloadUrl && (
              <div className="mt-8 text-center space-y-4">
                <a
                  onClick={handleDownload}
                  download="converted.pdf"
                  className="inline-block bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Download PDF
                </a>

                {/* RESET BUTTON MUNCUL DI SINI */}
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="w-full mt-4"
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
