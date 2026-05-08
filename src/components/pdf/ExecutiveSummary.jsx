import React from "react";

export default function ExecutiveSummary({ pack }) {
  const s = pack.summary;
  const fmt = (v) =>
    v != null
      ? `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "—";

  return (
    <div className="px-8 pb-6">
      {/* About this pack */}
      <div className="border border-[#D9DEE7] rounded-lg p-5 mb-4">
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em] mb-2">
          About This Payment Pack
        </p>
        <p className="text-[11px] text-[#4A5568] leading-relaxed">
          Metal X Renewables has prepared this payment pack for scrap metal collections supplied by Owens For Scrap
          during the {pack.period}. This pack covers {s.weighedMaterialJobs} weighed material
          {s.weighedMaterialJobs !== 1 ? " jobs" : " job"}
          {s.binServiceJobs > 0 ? ` and ${s.binServiceJobs} Alkimos bin service job${s.binServiceJobs !== 1 ? "s" : ""}` : ""}.
          All values include GST. Final amounts are subject to docket and DMT/GMT certificate confirmation.
        </p>
      </div>

      {/* Financial summary card */}
      <div className="border border-[#D9DEE7] rounded-lg overflow-hidden mb-4">
        {/* Header row */}
        <div className="px-5 py-3 border-b border-[#D9DEE7] bg-[#F8FAFC]">
          <div className="flex justify-between">
            <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Description</p>
            <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Amount (Incl. GST)</p>
          </div>
        </div>

        {/* Rows */}
        <div className="px-5 py-1">
          <Row
            label={`Material value — ${s.weighedMaterialJobs} collection${s.weighedMaterialJobs !== 1 ? "s" : ""}, ${s.totalPayableTonnes.toFixed(2)} t`}
            value={fmt(s.totalMaterialValue)}
            bold
          />
          <Row
            label="Less: transport deductions"
            value={`–${fmt(s.totalTransportDeductions)}`}
            muted
          />
          {s.alkimosServiceCharges > 0 && (
            <Row
              label="Alkimos bin service charges"
              value={fmt(s.alkimosServiceCharges)}
            />
          )}
        </div>

        {/* Net payable — dark navy block */}
        <div className="bg-[#0D1F3C] px-5 py-4 flex justify-between items-end mt-1">
          <div>
            <p className="text-[11px] font-bold text-[#4A90D9]">
              Net Payable to Owens For Scrap
            </p>
            <p className="text-[9px] text-[#8FA8C8] mt-0.5">
              {pack.status === "Paid" ? "Payment has been made — reference only." : "Outstanding — payable by Metal X."}
            </p>
          </div>
          <p className="text-[24px] font-bold text-white leading-none">
            {s.remittancePaid != null && pack.status === "Paid"
              ? fmt(s.remittancePaid)
              : fmt(s.calculatedNetPayable)}
          </p>
        </div>
      </div>

      {/* Conflict notice */}
      {s.conflictNote && (
        <div className="border border-[#D9DEE7] rounded-lg p-5">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em] mb-2">
            Calculation Conflict
          </p>
          <p className="text-[11px] text-[#4A5568] leading-relaxed">{s.conflictNote}</p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, muted, bold }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9] last:border-0">
      <span className={`text-[11px] ${muted ? "text-[#6B7280]" : "text-[#1A2840]"}`}>
        {label}
      </span>
      <span className={`text-[11px] ${bold ? "font-bold text-[#1A2840]" : muted ? "text-[#6B7280]" : "text-[#1A2840]"}`}>
        {value}
      </span>
    </div>
  );
}