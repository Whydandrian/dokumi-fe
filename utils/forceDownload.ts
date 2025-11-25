// utils/forceDownload.ts
export async function forceDownload(url: string, filename: string) {
  const res = await fetch(url);

  if (!res.ok) throw new Error("Gagal mengambil file untuk download");

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(blobUrl);
}
