import React from "react";
import { paymentPacks, grandSummary } from "@/lib/paymentPackData";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function GrandSummary() {
  const g = grandSummary;

  return (
    <div className="px-10 pb-6 space-y-6">
      {/* Pack-by-pack */}
      <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">Payment Pack Summary</p>
        </div>
        {/* Header row */}
        <div className="grid grid-cols-5 px-5 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          {["Pack", "Period", "Jobs", "Tonnes", "Net Payable"].map((h) => (
            <p key={h} className="text-[8px] font-bold text-[#9CA3AF] uppercase tracking-[0.08em]">{h}</p>
          ))}
        </div>
        {paymentPacks.map((pack) => {
          const jobRefs = [...pack.jobs.map((j) => j.jobRef), ...pack.alkimosJobs.map((j) => j.jobRef)].join(", ");
          return (
            <div key={pack.id} className="grid grid-cols-5 px-5 py-3 border-b border-[#F3F4F6] last:border-0">
              <p className="text-[10px] font-bold text-[#0D1F3C]">{pack.id}</p>
              <p className="text-[10px] text-[#6B7280]">{pack.period}</p>
              <p className="text-[10px] text-[#6B7280]">{jobRefs}</p>
              <p className="text-[10px] text-[#0D1F3C]">{pack.summary.totalPayableTonnes.toFixed(3)} t</p>
              <p className="text-[10px] font-semibold text-[#0D1F3C]">
                {pack.summary.conflictNote
                  ? `Controlled ${fmt(pack.summary.calculatedNetPayable)}`
                  : fmt(pack.summary.calculatedNetPayable)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Grand totals */}
      <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">Grand Totals</p>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          <GRow label="Total payment packs" value={g.totalPacks} />
          <GRow label="Total payable tonnes" value={`${g.totalPayableTonnes.toFixed(3)} t`} />
          <GRow label="Total material value incl. GST" value={fmt(g.totalMaterialValue)} />
          <GRow label="Total transport deductions incl. GST" value={`–${fmt(g.totalTransportDeductions)}`} />
          <GRow label="Total Alkimos service charges incl. GST" value={`–${fmt(g.totalAlkimosCharges)}`} />
          <GRow label="Controlled final net payable" value={fmt(g.controlledNetPayable)} />
          <GRow label="Total paid by remittance evidence" value={fmt(g.totalPaidByRemittance)} />
        </div>
        <div className="bg-[#0D1F3C] px-5 py-4 flex justify-between items-center">
          <p className="text-[11px] font-bold text-white">Total outstanding payable to Owens</p>
          <p className="text-[22px] font-bold text-white">{fmt(g.totalOutstandingPayable)}</p>
        </div>
      </div>
    </div>
  );
}

function GRow({ label, value }) {
  return (
    <div className="px-5 py-3 flex justify-between items-center">
      <p className="text-[10px] text-[#6B7280]">{label}</p>
      <p className="text-[10px] font-semibold text-[#0D1F3C]">{value}</p>
    </div>
  );
}