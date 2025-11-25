'use client';

import { useRef, useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

type DownloadState = {
  folder: string;
  files: string[];
};

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState<string>('');
  const [isSplitting, setIsSplitting] = useState(false);
  const [downloadState, setDownloadState] = useState<DownloadState | null>(null);

  // ref untuk file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001").replace(/\/$/, '');

  // buka dialog file
  const openFileDialog = () => fileInputRef.current?.click();

  // handle upload file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      alert("Hanya file PDF yang diperbolehkan.");
      return;
    }

    setFile(selected);
    setDownloadState(null);
  };

  // reset semua state & input file (penting agar upload ulang file sama bekerja)
  const resetAll = () => {
    setFile(null);
    setPageRange('');
    setDownloadState(null);
    setIsSplitting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // parse server response and build absolute URLs
  const buildDownloadState = (download_folder: string, split_files: string[]) => {
    const folder = download_folder.startsWith('/') ? `${API_BASE}${download_folder}` : `${API_BASE}/${download_folder}`;
    const files = (split_files || []).map(f => `${folder}/${f}`);
    setDownloadState({ folder, files });
  };

  // download helper: fetch -> blob -> anchor
  const downloadViaBlob = async (url: string, filename?: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const objUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objUrl;
      a.download = filename || url.split('/').pop() || 'download.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objUrl);
    } catch (err) {
      console.error('Download error', err);
      alert('Gagal mengunduh file.');
    }
  };

  // handler split -> kirim ke backend
  const handleSplit = async () => {
    if (!file) return alert("Silakan upload file PDF terlebih dahulu.");

    const pageRangesToSend = pageRange.trim(); // bisa kosong

    setIsSplitting(true);
    setDownloadState(null);

    const formData = new FormData();
    formData.append('file', file);
    // backend menerima 'page_ranges' (preferred). Accept also 'range' if needed.
    formData.append('page_ranges', pageRangesToSend);

    try {
      const res = await fetch(`${API_BASE}/docs/api/tools/split-pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(()=>null);
        console.error('Server error', res.status, text);
        throw new Error('Server error');
      }

      const data = await res.json();

      if (data.status === 'success') {
        // backend should return `download_folder` and `split_files` array
        const download_folder = data.download_folder || data.download_url || null;
        const split_files = data.split_files || [];
        if (!download_folder || split_files.length === 0) {
          // fallback: if server returned single download_url string
          if (data.download_url) {
            // make single-file download state
            setDownloadState({
              folder: data.download_url.replace(/\/[^/]*$/, ''), // folder part
              files: [ (data.download_url.startsWith('/') ? `${API_BASE}${data.download_url}` : data.download_url) ]
            });
          } else {
            alert('Proses split selesai, namun server tidak mengembalikan file.');
          }
        } else {
          buildDownloadState(download_folder, split_files);
        }
      } else {
        alert(data.message || 'Gagal split PDF.');
      }
    } catch (err) {
      console.error('Split error', err);
      alert('Terjadi kesalahan saat memproses PDF.');
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />

      <main className="pt-16 md:pt-20">
        <section className="py-16 md:py-24 bg-white">
          <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Split PDF</h1>
            <p className="text-gray-600 mb-8">
              Pisahkan PDF menjadi beberapa file. Masukkan range halaman (contoh: 1-3,5,7-9). Kosongkan untuk split semua halaman.
            </p>

            {/* Upload Area */}
            <div
              onClick={openFileDialog}
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
              <Upload className="mx-auto mb-4 w-12 h-12 text-gray-500" />
              <p className="text-gray-600 mb-4">Klik untuk memilih file PDF.</p>
              <Button variant="outline">Pilih File PDF</Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* File Info */}
            {file && (
              <div className="mt-6">
                <div className="mb-2 font-semibold">{file.name}</div>
                <input
                  type="text"
                  className="border rounded p-2 w-full"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="Contoh range: 1-3,5,7-9 (kosong = semua halaman)"
                />
              </div>
            )}

            {/* Actions */}
            {file && (
              <div className="mt-6 flex gap-4">
                <Button onClick={handleSplit} disabled={isSplitting} className="w-full">
                  {isSplitting ? 'Memproses...' : 'Split PDF'}
                </Button>

                <Button variant="outline" onClick={resetAll}>
                  Reset
                </Button>
              </div>
            )}

            {/* Download area */}
            {downloadState && (
              <div className="mt-8 text-center space-y-4">
                {downloadState.files.length === 1 ? (
                  <Button onClick={() => downloadViaBlob(downloadState.files[0])}>
                    Download Hasil Split
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Download File Per Halaman</h3>
                    {downloadState.files.map((url, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full"
                        onClick={() => downloadViaBlob(url)}
                      >
                        Download {url.split('/').pop()}
                      </Button>
                    ))}
                    {/* Optional: Download All (ZIP) if backend provides /all.zip */}
                    <Button
                      className="w-full mt-2"
                      variant="secondary"
                      onClick={() => downloadViaBlob(`${downloadState.folder}/all.zip`)}
                    >
                      Download Semua (ZIP)
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
