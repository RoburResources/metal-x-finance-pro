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
              ? "bg-[#0B1929] text-white shadow-lg"
              : "bg-white text-[#08111F] border border-[#D9DEE7] hover:border-[#1E4D99] hover:text-[#1E4D99]"
          }`}
        >
          Pack {pack.id}
          <span className={`ml-2 text-[9px] font-normal ${
            selectedPackId === pack.id ? "text-[#D9DEE7]" : "text-[#6F7472]"
          }`}>
            {pack.status}
          </span>
        </button>
      ))}
      <button
        onClick={onSelectGrand}
        className={`px-4 py-2 rounded text-[11px] font-semibold tracking-wide transition-all ${
          selectedPackId === "grand"
            ? "bg-[#1E4D99] text-white shadow-lg"
            : "bg-white text-[#08111F] border border-[#D9DEE7] hover:border-[#1E4D99] hover:text-[#1E4D99]"
        }`}
      >
        Grand Summary
      </button>
    </div>
  );
}