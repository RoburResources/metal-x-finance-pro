import React from "react";
import { X, Settings2, Eye, EyeOff, Type } from "lucide-react";

const SECTION_TOGGLES = [
  { key: "showExecutiveSummary", label: "Executive Summary" },
  { key: "showJobDetails", label: "Job Details" },
  { key: "showMeasurementPricing", label: "Measurement & Pricing" },
  { key: "showEvidencePhotos", label: "Evidence Photos" },
  { key: "showPaymentSummary", label: "Payment Summary" },
  { key: "showRCTIDetails", label: "RCTI Details" },
  { key: "showRemittanceEvidence", label: "Remittance Evidence" },
  { key: "showConfidentialityBlock", label: "Confidentiality Block" },
];

export default function PDFSettingsPanel({ settings, onChange, onClose }) {
  function toggle(key) {
    onChange({ ...settings, [key]: !settings[key] });
  }

  function set(key, value) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-80 bg-white h-full shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0D1F3C] px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Settings2 className="w-4 h-4 text-[#6B9ED4]" />
            <p className="text-[13px] font-bold text-white">PDF Export Settings</p>
          </div>
          <button onClick={onClose} className="text-[#8FA8C8] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Section toggles */}
          <div>
            <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-3">
              Include / Exclude Sections
            </p>
            <div className="space-y-1">
              {SECTION_TOGGLES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left ${
                    settings[key]
                      ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#0D1F3C]"
                      : "bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF]"
                  }`}
                >
                  <span className="text-[11px] font-medium">{label}</span>
                  {settings[key] ? (
                    <Eye className="w-3.5 h-3.5 text-[#1E4D99]" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-[#D1D5DB]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Branding */}
          <div>
            <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-3">
              Custom Branding
            </p>

            {/* Custom header */}
            <div className="space-y-2 mb-4">
              <button
                onClick={() => toggle("customHeaderEnabled")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left ${
                  settings.customHeaderEnabled
                    ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#0D1F3C]"
                    : "bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Type className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">Custom Header Banner</span>
                </div>
                {settings.customHeaderEnabled ? (
                  <Eye className="w-3.5 h-3.5 text-[#1E4D99]" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-[#D1D5DB]" />
                )}
              </button>
              {settings.customHeaderEnabled && (
                <textarea
                  value={settings.customHeaderText}
                  onChange={(e) => set("customHeaderText", e.target.value)}
                  placeholder="e.g. PRIVATE & CONFIDENTIAL — For authorised recipients only"
                  className="w-full text-[11px] border border-[#E2E8F0] rounded-lg px-3 py-2 resize-none text-[#0D1F3C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E4D99]/30 bg-white"
                  rows={3}
                />
              )}
            </div>

            {/* Custom footer */}
            <div className="space-y-2">
              <button
                onClick={() => toggle("customFooterEnabled")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left ${
                  settings.customFooterEnabled
                    ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#0D1F3C]"
                    : "bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Type className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">Custom Footer Note</span>
                </div>
                {settings.customFooterEnabled ? (
                  <Eye className="w-3.5 h-3.5 text-[#1E4D99]" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-[#D1D5DB]" />
                )}
              </button>
              {settings.customFooterEnabled && (
                <textarea
                  value={settings.customFooterText}
                  onChange={(e) => set("customFooterText", e.target.value)}
                  placeholder="e.g. Prepared by Metal X Accounts — queries to accounts@metalxrenewables.com.au"
                  className="w-full text-[11px] border border-[#E2E8F0] rounded-lg px-3 py-2 resize-none text-[#0D1F3C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E4D99]/30 bg-white"
                  rows={3}
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer action */}
        <div className="px-5 py-4 border-t border-[#E2E8F0] shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-[#0D1F3C] hover:bg-[#1E4D99] text-white text-[11px] font-semibold rounded-lg py-2.5 transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}