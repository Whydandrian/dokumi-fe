'use client';

import { useRef, useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Trash2, Download } from 'lucide-react';

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mergedFilename, setMergedFilename] = useState<string>("merged.pdf");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Base API
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  // Helper: Extract filename from URL
  const extractFilename = (url: string) => {
    try {
      return url.split("/").pop() || "merged.pdf";
    } catch {
      return "merged.pdf";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    const pdfOnly = selected.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfOnly]);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Minimal pilih 2 file PDF untuk merge.");
      return;
    }

    setIsMerging(true);
    setDownloadUrl(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("files[]", file));

    try {
      const res = await fetch(`${API_BASE}/docs/api/tools/merge-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error(await res.text());
        throw new Error("Server error");
      }

      const data = await res.json();

      if (data.status === "success") {
        setDownloadUrl(data.download_url);

        // Ambil nama file dari download_url backend
        const filename = extractFilename(data.download_url);
        setMergedFilename(filename);
      } else {
        alert(data.message || "Gagal merge PDF.");
      }
    } catch (error) {
      console.error("Merge error:", error);
      alert("Terjadi kesalahan saat menggabungkan file.");
    } finally {
      setIsMerging(false);
    }
  };

  const resetAll = () => {
    setFiles([]);
    setDownloadUrl(null);
    setMergedFilename("merged.pdf");
  };

  // Download logic menggunakan Blob (lebih aman)
  const handleDownload = async () => {
    if (!downloadUrl) return;

    try {
      const res = await fetch(downloadUrl);

      if (!res.ok) throw new Error("Gagal mengunduh file");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = mergedFilename; // nama file asli
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download error", e);
      alert("Gagal mengunduh file hasil merge.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="pt-16 md:pt-20">
        <section className="py-16 md:py-24 bg-white">
          <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Merge PDF</h1>
            <p className="text-gray-600 mb-8">
              Gabungkan beberapa file PDF menjadi satu file PDF.
            </p>

            {/* Upload Area */}
            <div
              onClick={openFileDialog}
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
              <Upload className="mx-auto mb-4 w-12 h-12 text-gray-500" />
              <p className="text-gray-600 mb-4">
                Klik di sini untuk memilih satu atau lebih file PDF.
              </p>

              <Button variant="outline">Pilih File PDF</Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-8 space-y-3">
                <h3 className="font-semibold text-lg">File yang dipilih:</h3>

                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-primary" />
                      <span>{file.name}</span>
                    </div>

                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {files.length > 0 && !downloadUrl && (
              <div className="mt-8 flex gap-4">
                <Button
                  onClick={handleMerge}
                  disabled={isMerging}
                  className="w-full"
                >
                  {isMerging ? "Menggabungkan..." : "Merge PDF"}
                </Button>

                <Button variant="outline" onClick={resetAll} className="w-40">
                  Reset
                </Button>
              </div>
            )}

            {/* Download Result */}
            {downloadUrl && (
              <div className="mt-10 text-center">
                <Button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition"
                >
                  <Download className="w-5 h-5" />
                  Download: {mergedFilename}
                </Button>

                <div className="mt-6">
                  <Button variant="outline" onClick={resetAll}>
                    Merge File Lagi
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
