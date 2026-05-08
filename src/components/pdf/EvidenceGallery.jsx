import React, { useState, useRef } from "react";
import { evidenceImages } from "@/lib/paymentPackData";
import { useEvidenceStore, setEvidenceUrl } from "@/lib/evidenceStore";
import { base44 } from "@/api/base44Client";
import { Camera, ZoomIn, Upload, Loader2, CheckCircle } from "lucide-react";

function extractPhotoLabel(filename) {
  const parts = filename.replace(/\.(jpeg|jpg|png|webp)$/i, "").split("_");
  const num = parts[1] || "";
  const datePart = parts.find((p) => /^\d{2}-\d{2}-\d{4}$/.test(p));
  const date = datePart
    ? datePart.split("-").join("/")
    : "";
  const dateIdx = datePart ? parts.indexOf(datePart) : -1;
  const labelParts = dateIdx >= 0 ? parts.slice(dateIdx + 1) : parts.slice(3);
  const label = labelParts.join(" ").replace(/_/g, " ") || "evidence";
  return { num, date, label };
}

export default function EvidenceGallery({ evidence }) {
  const [zoomed, setZoomed] = useState(null);
  const [uploading, setUploading] = useState({});
  const inputRefs = useRef({});
  const store = useEvidenceStore();

  if (!evidence || evidence.length === 0) return null;

  function getUrl(filename) {
    return store[filename] || evidenceImages[filename] || null;
  }

  async function handleFileChange(filename, file) {
    if (!file) return;
    setUploading((u) => ({ ...u, [filename]: true }));
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setEvidenceUrl(filename, file_url);
    setUploading((u) => ({ ...u, [filename]: false }));
  }

  function triggerUpload(filename) {
    if (!inputRefs.current[filename]) return;
    inputRefs.current[filename].click();
  }

  const cols = evidence.length === 1 ? "grid-cols-1" : "grid-cols-2";

  return (
    <div className="mt-4 border-t border-[#E2E8F0] pt-4">
      <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3">
        Supporting Evidence — {evidence.length} photo{evidence.length !== 1 ? "s" : ""}
      </p>

      <div className={`grid gap-3 ${cols}`}>
        {evidence.map((filename) => {
          const url = getUrl(filename);
          const { num, date, label } = extractPhotoLabel(filename);
          const isUploading = uploading[filename];

          return (
            <div key={filename} className="group relative">
              {/* Hidden file input */}
              <input
                ref={(el) => (inputRefs.current[filename] = el)}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(filename, e.target.files[0])}
              />

              {url ? (
                /* ── Uploaded image ── */
                <>
                  <div
                    className="relative overflow-hidden rounded-lg border border-[#E2E8F0] cursor-zoom-in"
                    style={{ aspectRatio: "4/3" }}
                    onClick={() => setZoomed(url)}
                  >
                    <img
                      src={url}
                      alt={`Evidence photo ${num}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-[#0D1F3C]/0 group-hover:bg-[#0D1F3C]/30 transition-all duration-200 flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {/* Re-upload overlay */}
                    <button
                      onClick={(e) => { e.stopPropagation(); triggerUpload(filename); }}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      title="Replace image"
                    >
                      <Upload className="w-3 h-3 text-[#0D1F3C]" />
                    </button>
                  </div>
                  <div className="mt-1.5 px-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                    <div>
                      <p className="text-[8px] font-semibold text-[#0D1F3C]">Photo {num}</p>
                      <p className="text-[8px] text-[#9CA3AF] capitalize">{date && `${date} · `}{label}</p>
                    </div>
                  </div>
                </>
              ) : isUploading ? (
                /* ── Uploading spinner ── */
                <div
                  className="rounded-lg border border-[#1E4D99]/30 bg-[#EFF6FF] flex flex-col items-center justify-center gap-2 py-8"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Loader2 className="w-5 h-5 text-[#1E4D99] animate-spin" />
                  <p className="text-[8px] font-semibold text-[#1E4D99]">Uploading…</p>
                </div>
              ) : (
                /* ── Clickable placeholder ── */
                <button
                  onClick={() => triggerUpload(filename)}
                  className="w-full rounded-lg border-2 border-dashed border-[#D1D5DB] bg-[#F8FAFC] hover:border-[#1E4D99] hover:bg-[#EFF6FF] transition-colors flex flex-col items-center justify-center gap-2 py-8 cursor-pointer group/ph"
                  style={{ aspectRatio: "4/3" }}
                  title="Click to upload photo"
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] group-hover/ph:border-[#1E4D99] flex items-center justify-center transition-colors shadow-sm">
                    <Upload className="w-4 h-4 text-[#9CA3AF] group-hover/ph:text-[#1E4D99] transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-semibold text-[#6B7280] group-hover/ph:text-[#1E4D99] transition-colors">
                      Photo {num}
                    </p>
                    <p className="text-[8px] text-[#9CA3AF] capitalize mt-0.5">{date && `${date} · `}{label}</p>
                    <p className="text-[8px] text-[#1E4D99] font-medium mt-1.5 opacity-0 group-hover/ph:opacity-100 transition-opacity">
                      Click to upload
                    </p>
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setZoomed(null)}
        >
          <img
            src={zoomed}
            alt="Evidence"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
            style={{ maxHeight: "90vh" }}
          />
        </div>
      )}
    </div>
  );
}