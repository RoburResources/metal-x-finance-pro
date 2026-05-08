import React from "react";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function JobDetailsSection({ jobs, alkimosJobs }) {
  return (
    <div className="px-8 pb-6">
      <SectionLabel>Job Details</SectionLabel>

      {jobs.map((job, i) => (
        <div key={job.jobRef} className="border border-[#D9DEE7] rounded-lg overflow-hidden mb-4">
          {/* Job title bar */}
          <div className="px-5 py-3 border-b border-[#D9DEE7] bg-[#F8FAFC]">
            <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em]">
              Job {i + 1} — {job.jobRef}
            </p>
            <p className="text-[12px] font-bold text-[#0D1F3C] mt-0.5">{job.description}</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">{job.material}</p>
          </div>

          {/* Metadata grid */}
          <div className="px-5 py-4 grid grid-cols-3 gap-4 border-b border-[#D9DEE7]">
            <Meta label="Site" value={job.site} />
            <Meta label="Collection Date" value={job.collectionDate} />
            <Meta label="Docket No." value={job.docketNumber} />
            <Meta label="DMT Ref" value={job.dmtRef} />
            <Meta label="GMT Ref" value={job.gmtRef} />
            <Meta label="GST Status" value={job.gst} />
          </div>

          {/* Financial table */}
          <div className="px-5 py-1">
            <div className="flex justify-between py-2.5 border-b border-[#F1F5F9]">
              <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Description</p>
              <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Amount (Incl. GST)</p>
            </div>
            <div className="flex justify-between py-2.5 border-b border-[#F1F5F9]">
              <span className="text-[11px] text-[#1A2840]">
                {job.material} — {job.tonnes.toFixed(2)} t @ {fmt(job.rate)}/t
              </span>
              <span className="text-[11px] font-bold text-[#1A2840]">{fmt(job.grossValue)}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-[#F1F5F9]">
              <span className="text-[11px] text-[#6B7280]">Less: transport deduction</span>
              <span className="text-[11px] text-[#6B7280]">–{fmt(job.transportDeduction)}</span>
            </div>
          </div>

          {/* Net payable row */}
          <div className="bg-[#0D1F3C] px-5 py-3 flex justify-between items-center">
            <p className="text-[11px] font-bold text-[#4A90D9]">Net Payable — {job.jobRef}</p>
            <p className="text-[18px] font-bold text-white">{fmt(job.netPayable)}</p>
          </div>
        </div>
      ))}

      {/* Alkimos bin service jobs */}
      {alkimosJobs.length > 0 && (
        <>
          <SectionLabel>Alkimos Bin Services</SectionLabel>
          {alkimosJobs.map((job) => (
            <div key={job.jobRef} className="border border-[#D9DEE7] rounded-lg overflow-hidden mb-4">
              <div className="px-5 py-3 border-b border-[#D9DEE7] bg-[#F8FAFC]">
                <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em]">
                  {job.jobRef}
                </p>
                <p className="text-[12px] font-bold text-[#0D1F3C] mt-0.5">{job.description}</p>
              </div>
              <div className="px-5 py-4 grid grid-cols-3 gap-4 border-b border-[#D9DEE7]">
                <Meta label="Site" value={job.site} />
                <Meta label="Service Date" value={job.serviceDate} />
                <Meta label="GST Status" value={job.gst} />
              </div>
              <div className="px-5 py-2.5 border-b border-[#F1F5F9]">
                <p className="text-[10px] text-[#6B7280]">{job.note}</p>
              </div>
              <div className="bg-[#0D1F3C] px-5 py-3 flex justify-between items-center">
                <p className="text-[11px] font-bold text-[#4A90D9]">Service Charge — {job.jobRef}</p>
                <p className="text-[18px] font-bold text-white">${job.serviceCharge.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D9DEE7]" />
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">{children}</p>
        <div className="h-px flex-1 bg-[#D9DEE7]" />
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-[8px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">{label}</p>
      <p className="text-[11px] text-[#1A2840] mt-0.5 font-medium">{value}</p>
    </div>
  );
}