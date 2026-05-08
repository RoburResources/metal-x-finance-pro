import React from "react";

const fmt = (v) =>
  v != null
    ? `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

export default function ExecutiveSummary({ pack }) {
  const s = pack.summary;

  return (
    <div className="px-10 pb-6">
      <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">Executive Summary</p>
        </div>

        {/* Summary grid */}
        <div className="grid grid-cols-2 divide-x divide-[#E2E8F0]">
          <SummaryCell label="Payment pack" value={pack.id} />
          <SummaryCell label="Payment status" value={pack.statusNote} />
          <SummaryCell label="Weighed material jobs" value={s.weighedMaterialJobs} border />
          <SummaryCell label="Bin service jobs" value={s.binServiceJobs} border />
          <SummaryCell label="Payable tonnes" value={`${s.totalPayableTonnes.toFixed(3)} t`} border />
          <SummaryCell label="Material value incl. GST" value={fmt(s.totalMaterialValue)} border />
          <SummaryCell label="Transport deductions incl. GST" value={`–${fmt(s.totalTransportDeductions)}`} border />
          <SummaryCell label="Alkimos charges incl. GST" value={s.alkimosServiceCharges > 0 ? `–${fmt(s.alkimosServiceCharges)}` : "$0.00"} border />
        </div>

        {/* Final net payable */}
        <div className="bg-[#0D1F3C] px-5 py-4 flex justify-between items-center">
          <p className="text-[11px] font-bold text-white">Final net payable incl. GST</p>
          <p className="text-[22px] font-bold text-white">{fmt(s.calculatedNetPayable)}</p>
        </div>
      </div>

      {s.conflictNote && (
        <div className="border border-[#FCA5A5] bg-[#FFF5F5] rounded-xl p-4 mt-4">
          <p className="text-[9px] font-bold text-[#DC2626] uppercase tracking-[0.08em] mb-1">Calculation Conflict — Reference</p>
          <p className="text-[10px] text-[#7F1D1D] leading-relaxed">{s.conflictNote}</p>
        </div>
      )}
    </div>
  );
}

function SummaryCell({ label, value, border }) {
  return (
    <div className={`px-5 py-3.5 ${border ? "border-t border-[#E2E8F0]" : ""}`}>
      <p className="text-[9px] text-[#9CA3AF] uppercase tracking-[0.08em] mb-1">{label}</p>
      <p className="text-[11px] font-semibold text-[#0D1F3C]">{value}</p>
    </div>
  );
}