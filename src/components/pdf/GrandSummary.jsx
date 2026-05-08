import React from "react";
import { paymentPacks, grandSummary } from "@/lib/paymentPackData";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function GrandSummary() {
  const g = grandSummary;

  return (
    <div className="px-8 pb-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Packs" value={g.totalPacks} />
        <StatCard label="Paid Packs" value={g.paidPacks} />
        <StatCard label="Outstanding Packs" value={g.outstandingPacks} />
        <StatCard label="Grand Total" value={fmt(g.grandTotal)} highlight />
      </div>

      {/* Pack-by-pack table */}
      <div className="border border-[#D9DEE7] rounded-lg overflow-hidden mb-4">
        {/* Header */}
        <div className="grid grid-cols-5 bg-[#F8FAFC] px-5 py-3 border-b border-[#D9DEE7]">
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Pack</p>
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Period</p>
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Status</p>
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] text-right">Tonnes</p>
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] text-right">Net Payable</p>
        </div>

        {paymentPacks.map((pack) => (
          <div key={pack.id} className="grid grid-cols-5 px-5 py-3 border-b border-[#F1F5F9]">
            <span className="text-[11px] font-medium text-[#1A2840]">{pack.id}</span>
            <span className="text-[11px] text-[#4A5568]">{pack.period}</span>
            <span>
              <span className={`text-[9px] font-bold uppercase tracking-[0.06em] px-2 py-1 rounded-sm ${
                pack.status === "Paid"
                  ? "bg-[#EEF4FF] text-[#1E4D99]"
                  : "bg-[#FFF4E5] text-[#B45309]"
              }`}>
                {pack.status}
              </span>
            </span>
            <span className="text-[11px] text-[#1A2840] text-right">
              {pack.summary.totalPayableTonnes.toFixed(2)} t
            </span>
            <span className="text-[11px] font-bold text-[#1A2840] text-right">
              {fmt(pack.summary.calculatedNetPayable)}
            </span>
          </div>
        ))}

        {/* Grand total row */}
        <div className="grid grid-cols-5 px-5 py-3.5 bg-[#F8FAFC] border-t border-[#D9DEE7]">
          <span className="col-span-2 text-[11px] font-bold text-[#0D1F3C]">Grand Total</span>
          <span />
          <span className="text-[11px] font-bold text-[#0D1F3C] text-right">
            {paymentPacks.reduce((sum, p) => sum + p.summary.totalPayableTonnes, 0).toFixed(2)} t
          </span>
          <span className="text-[11px] font-bold text-[#0D1F3C] text-right">
            {fmt(g.grandTotal)}
          </span>
        </div>
      </div>

      {/* Outstanding callout */}
      <div className="bg-[#0D1F3C] rounded-lg px-6 py-5 flex justify-between items-end">
        <div>
          <p className="text-[11px] font-bold text-[#4A90D9]">Total Outstanding</p>
          <p className="text-[9px] text-[#8FA8C8] mt-0.5">{g.outstandingPayable}</p>
        </div>
        <p className="text-[28px] font-bold text-white leading-none">{fmt(g.totalOutstandingAmount)}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div className={`border rounded-lg p-4 ${highlight ? "border-[#1E4D99] bg-[#EEF4FF]" : "border-[#D9DEE7] bg-[#F8FAFC]"}`}>
      <p className={`text-[9px] font-bold uppercase tracking-[0.1em] mb-1.5 ${highlight ? "text-[#1E4D99]" : "text-[#6B7280]"}`}>
        {label}
      </p>
      <p className={`text-[16px] font-bold ${highlight ? "text-[#1E4D99]" : "text-[#0D1F3C]"}`}>{value}</p>
    </div>
  );
}