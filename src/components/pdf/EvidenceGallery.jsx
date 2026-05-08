import React, { useState } from "react";
import { evidenceImages } from "@/lib/paymentPackData";
import { Camera, ZoomIn } from "lucide-react";

function getUrl(filename) {
  return evidenceImages[filename] || null;
}

function extractPhotoLabel(filename) {
  // Extract a friendly label from the filename
  // e.g. "Photo_01_MXR00523_20-04-2026_collection.jpeg" → "Photo 01 · 20/04/2026 · Collection"
  const parts = filename.replace(/\.(jpeg|jpg|png)$/i, "").split("_");
  const num = parts[1] || "";
  const ref = parts[2] || "";
  // Find date pattern
  const datePart = parts.find((p) => /^\d{2}-\d{2}-\d{4}$/.test(p));
  const date = datePart ? datePart.replace(/-/g, "/").replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$1/$2/$3") : "";
  // Everything after date as label
  const dateIdx = datePart ? parts.indexOf(datePart) : -1;
  const labelParts = dateIdx >= 0 ? parts.slice(dateIdx + 1) : parts.slice(3);
  const label = labelParts.join(" ").replace(/_/g, " ") || "evidence";
  return { num, ref, date, label };
}

export default function EvidenceGallery({ evidence, jobRef }) {
  const [zoomed, setZoomed] = useState(null);

  if (!evidence || evidence.length === 0) return null;

  const hasAnyUrl = evidence.some((f) => getUrl(f));

  return (
    <div className="mt-4 border-t border-[#E2E8F0] pt-4">
      <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3">
        Supporting Evidence — {evidence.length} photo{evidence.length !== 1 ? "s" : ""}
      </p>

      {hasAnyUrl ? (
        <div className={`grid gap-3 ${evidence.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {evidence.map((filename) => {
            const url = getUrl(filename);
            const { num, date, label } = extractPhotoLabel(filename);
            return (
              <div key={filename} className="group relative">
                {url ? (
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
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-[#0D1F3C]/0 group-hover:bg-[#0D1F3C]/30 transition-all duration-200 flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                    {/* Caption */}
                    <div className="mt-1.5 px-0.5">
                      <p className="text-[8px] font-semibold text-[#0D1F3C]">Photo {num}</p>
                      <p className="text-[8px] text-[#9CA3AF] capitalize">{date && `${date} · `}{label}</p>
                    </div>
                  </>
                ) : (
                  <PlaceholderPhoto num={num} date={date} label={label} filename={filename} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* All placeholders — show as a compact list */
        <div className="space-y-1.5">
          {evidence.map((filename) => {
            const { num, date, label } = extractPhotoLabel(filename);
            return <PlaceholderPhoto key={filename} num={num} date={date} label={label} filename={filename} compact />;
          })}
        </div>
      )}

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

function PlaceholderPhoto({ num, date, label, filename, compact }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2.5 bg-[#F8FAFC] rounded-lg px-3 py-2 border border-dashed border-[#D1D5DB]">
        <Camera className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[8px] font-semibold text-[#6B7280]">Photo {num} — awaiting upload</p>
          <p className="text-[8px] text-[#9CA3AF] truncate capitalize">{date && `${date} · `}{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-dashed border-[#D1D5DB] bg-[#F8FAFC] flex flex-col items-center justify-center gap-1.5 py-6">
      <Camera className="w-5 h-5 text-[#D1D5DB]" />
      <p className="text-[8px] font-semibold text-[#9CA3AF]">Photo {num}</p>
      <p className="text-[8px] text-[#C4C9D4] capitalize text-center px-2">{date && `${date} · `}{label}</p>
      <p className="text-[7px] text-[#D1D5DB]">Awaiting upload</p>
    </div>
  );
}