import React from "react";

export default function ExecutiveSummary({ pack }) {
  const s = pack.summary;
  const fmt = (v) => v != null ? `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—";

  return (
    <div className="mb-8">
      <SectionHeading>Executive Summary</SectionHeading>

      <div className="border border-[#D9DEE7] rounded-sm overflow-hidden">
        <div className="bg-[#F4F7FB] px-5 py-3 border-b border-[#D9DEE7]">
          <div className="grid grid-cols-4 gap-4">
            <SummaryMeta label="PAYMENT PACK" value={pack.id} />
            <SummaryMeta label="PERIOD" value={pack.period} />
            <SummaryMeta label="WEIGHED JOBS" value={s.weighedMaterialJobs} />
            <SummaryMeta label="BIN SERVICE JOBS" value={s.binServiceJobs} />
          </div>
        </div>

        <div className="px-5 py-4 space-y-2.5">
          <SummaryRow label="Payable Tonnes" value={`${s.totalPayableTonnes.toFixed(2)} t`} />
          <SummaryRow label="Material Value" value={fmt(s.totalMaterialValue)} />
          <SummaryRow label="Transport Deductions" value={`– ${fmt(s.totalTransportDeductions)}`} muted />
          {s.alkimosServiceCharges > 0 && (
            <SummaryRow label="Alkimos Service Charges" value={fmt(s.alkimosServiceCharges)} />
          )}
          <div className="h-px bg-[#D9DEE7] my-1" />
          <div className="flex justify-between items-center pt-1">
            <span className="text-[9px] font-bold text-[#08111F] uppercase tracking-[0.04em]">
              Net Payable
            </span>
            <span className="text-[13px] font-bold text-[#08111F]">
              {fmt(s.calculatedNetPayable)}
            </span>
          </div>
          <p className="text-[8px] text-[#6F7472]">
            All values {pack.jobs[0]?.gst || "incl. GST"}
          </p>

          {s.remittancePaid != null && (
            <div className="mt-3 pt-3 border-t border-[#D9DEE7]">
              <SummaryRow label="Remittance Paid" value={fmt(s.remittancePaid)} bold />
              {s.conflictNote && (
                <div className="mt-2 p-2.5 bg-[#F4F7FB] border border-[#D9DEE7] rounded-sm">
                  <p className="text-[7.5px] font-bold text-[#1E4D99] uppercase tracking-[0.04em] mb-1">
                    CALCULATION CONFLICT
                  </p>
                  <p className="text-[8px] text-[#6F7472] leading-relaxed">
                    {s.conflictNote}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status footer */}
        <div className={`px-5 py-2.5 border-t border-[#D9DEE7] ${
          pack.status === "Paid" ? "bg-[#F4F7FB]" : "bg-[#0B1929]"
        }`}>
          <p className={`text-[8.5px] font-bold uppercase tracking-[0.05em] ${
            pack.status === "Paid" ? "text-[#1E4D99]" : "text-white"
          }`}>
            {pack.status === "Paid" ? "PAID — REFERENCE ONLY" : "OUTSTANDING — PAYABLE BY METAL X TO OWENS"}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <>
      <h3 className="text-[10px] font-bold text-[#08111F] uppercase tracking-[0.05em] mb-3">
        {children}
      </h3>
      <div className="h-px bg-[#D9DEE7] mb-4" />
    </>
  );
}

function SummaryMeta({ label, value }) {
  return (
    <div>
      <p className="text-[7px] font-bold text-[#6F7472] uppercase tracking-[0.04em]">{label}</p>
      <p className="text-[9px] font-semibold text-[#08111F] mt-0.5">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, muted, bold }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-[8.5px] ${bold ? "font-bold text-[#08111F]" : muted ? "text-[#6F7472]" : "text-[#08111F]"}`}>
        {label}
      </span>
      <span className={`text-[9px] font-medium ${muted ? "text-[#6F7472]" : "text-[#08111F]"}`}>
        {value}
      </span>
    </div>
  );
}