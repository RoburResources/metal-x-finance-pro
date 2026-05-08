import React from "react";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function PaymentSummaryTable({ pack }) {
  return (
    <div className="px-8 pb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-[#D9DEE7]" />
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">Payment Summary</p>
        <div className="h-px flex-1 bg-[#D9DEE7]" />
      </div>

      <div className="border border-[#D9DEE7] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 bg-[#F8FAFC] px-5 py-3 border-b border-[#D9DEE7]">
          <Col className="col-span-2">Job Ref</Col>
          <Col>Type</Col>
          <Col>Material</Col>
          <Col right>Tonnes</Col>
          <Col right>Gross</Col>
          <Col right>Net Payable</Col>
        </div>

        {/* Rows */}
        {pack.jobs.map((job) => (
          <div key={job.jobRef} className="grid grid-cols-7 px-5 py-3 border-b border-[#F1F5F9]">
            <span className="col-span-2 text-[11px] font-medium text-[#1A2840]">{job.jobRef}</span>
            <span className="text-[10px] text-[#6B7280]">Weighed</span>
            <span className="text-[11px] text-[#1A2840]">{job.material}</span>
            <span className="text-[11px] text-[#1A2840] text-right">{job.tonnes.toFixed(2)}</span>
            <span className="text-[11px] text-[#1A2840] text-right">{fmt(job.grossValue)}</span>
            <span className="text-[11px] font-medium text-[#1A2840] text-right">{fmt(job.netPayable)}</span>
          </div>
        ))}
        {pack.alkimosJobs.map((job) => (
          <div key={job.jobRef} className="grid grid-cols-7 px-5 py-3 border-b border-[#F1F5F9]">
            <span className="col-span-2 text-[11px] font-medium text-[#1A2840]">{job.jobRef}</span>
            <span className="text-[10px] text-[#6B7280]">Bin Service</span>
            <span className="text-[11px] text-[#6B7280]">—</span>
            <span className="text-[11px] text-[#6B7280] text-right">—</span>
            <span className="text-[11px] text-[#1A2840] text-right">{fmt(job.serviceCharge)}</span>
            <span className="text-[11px] font-medium text-[#1A2840] text-right">{fmt(job.serviceCharge)}</span>
          </div>
        ))}

        {/* Total row */}
        <div className="grid grid-cols-7 px-5 py-3.5 bg-[#F8FAFC] border-t border-[#D9DEE7]">
          <span className="col-span-2 text-[11px] font-bold text-[#0D1F3C]">Total — Pack {pack.id}</span>
          <span className="text-[10px] text-[#6B7280]"></span>
          <span className="text-[11px] text-[#6B7280]"></span>
          <span className="text-[11px] font-bold text-[#0D1F3C] text-right">
            {pack.summary.totalPayableTonnes.toFixed(2)}
          </span>
          <span className="text-[11px] font-bold text-[#0D1F3C] text-right">
            {fmt(pack.summary.totalMaterialValue + pack.summary.alkimosServiceCharges)}
          </span>
          <span className="text-[11px] font-bold text-[#0D1F3C] text-right">
            {fmt(pack.summary.calculatedNetPayable)}
          </span>
        </div>
      </div>

      <p className="text-[10px] text-[#6B7280] mt-2">
        All values incl. GST &nbsp;|&nbsp; Payable by Metal X Renewables to Owens For Scrap
      </p>
    </div>
  );
}

function Col({ children, right, className }) {
  return (
    <p className={`text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] ${right ? "text-right" : ""} ${className || ""}`}>
      {children}
    </p>
  );
}