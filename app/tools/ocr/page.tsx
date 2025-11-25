'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function OcrPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  async function handleOcr() {
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/docs/api/tools/ocr`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Gagal melakukan OCR.");
      }

      const data = await res.json();
      setResult(data);

      // Jika backend mengembalikan URL download txt → simpan di state
      if (data?.download_url) {
        setDownloadUrl(data.download_url);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="pt-16 md:pt-20">
        <section className="py-16 md:py-24 bg-white">
          <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">OCR PDF</h1>

            <p className="text-gray-600 mb-4">
              Unggah file PDF untuk diproses OCR (Bahasa Indonesia & Inggris).
            </p>

            {/* Input File */}
            <div className="space-y-4">
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm border border-gray-300 rounded-lg p-2"
              />

              <Button
                onClick={handleOcr}
                disabled={!file || loading}
                className="w-full"
              >
                {loading ? "Processing OCR..." : "Start OCR"}
              </Button>
            </div>

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

            {/* Teks Hasil OCR */}
            {result?.text_by_page && (
              <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold mb-3">Hasil OCR:</h3>

                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {result.text_by_page
                    .map(
                      (p: any) =>
                        `--- Halaman ${p.page} ---\n${p.text || "(kosong)"}`
                    )
                    .join("\n\n")}
                </pre>
              </div>
            )}

            {/* Tombol Download TXT */}
            {downloadUrl && (
              <div className="mt-8 text-center">
                <a
                  href={downloadUrl}
                  download="ocr_result.txt"
                  className="inline-block bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Download Hasil OCR (TXT)
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
