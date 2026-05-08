import React from "react";
import { paymentPacks } from "@/lib/paymentPackData";

export default function PackSelector({ selectedPackId, onSelect, onSelectGrand }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {paymentPacks.map((pack) => (
        <button
          key={pack.id}
          onClick={() => onSelect(pack.id)}
          className={`px-4 py-2 rounded text-[11px] font-semibold tracking-wide transition-all ${
            selectedPackId === pack.id
              ? "bg-[#0D1F3C] text-white shadow"
              : "bg-white text-[#0D1F3C] border border-[#D1D9E6] hover:border-[#0D1F3C]"
          }`}
        >
          Pack {pack.id}
          <span className={`ml-2 text-[9px] font-normal ${
            selectedPackId === pack.id ? "text-[#8FA8C8]" : "text-[#6B7280]"
          }`}>
            {pack.status}
          </span>
        </button>
      ))}
      <button
        onClick={onSelectGrand}
        className={`px-4 py-2 rounded text-[11px] font-semibold tracking-wide transition-all ${
          selectedPackId === "grand"
            ? "bg-[#0D1F3C] text-white shadow"
            : "bg-white text-[#0D1F3C] border border-[#D1D9E6] hover:border-[#0D1F3C]"
        }`}
      >
        Grand Summary
      </button>
    </div>
  );
}