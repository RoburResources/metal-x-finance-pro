import React from "react";

export default function EvidenceSection({ pack }) {
  const allJobs = [...pack.jobs, ...(pack.alkimosJobs || [])];

  return (
    <div className="px-8 pb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-[#D9DEE7]" />
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">Supporting Evidence</p>
        <div className="h-px flex-1 bg-[#D9DEE7]" />
      </div>

      <div className="border border-[#D9DEE7] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-[#F8FAFC] px-5 py-3 border-b border-[#D9DEE7]">
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Job Ref</p>
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Evidence Type</p>
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Reference</p>
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em]">Status</p>
        </div>

        {allJobs.map((job) =>
          job.type === "weighed_material" ? (
            <React.Fragment key={job.jobRef}>
              {[
                ["Collection Docket", job.docketNumber],
                ["DMT Certificate", job.dmtRef],
                ["GMT Certificate", job.gmtRef],
              ].map(([type, ref], idx) => (
                <div key={type} className="grid grid-cols-4 px-5 py-2.5 border-b border-[#F1F5F9]">
                  {idx === 0 ? (
                    <span className="text-[11px] font-medium text-[#1A2840]">{job.jobRef}</span>
                  ) : (
                    <span />
                  )}
                  <span className="text-[11px] text-[#1A2840]">{type}</span>
                  <span className="text-[10px] text-[#6B7280]">{ref}</span>
                  <span className="text-[10px] text-[#6B7280]">[Needs Confirmation]</span>
                </div>
              ))}
            </React.Fragment>
          ) : (
            <div key={job.jobRef} className="grid grid-cols-4 px-5 py-2.5 border-b border-[#F1F5F9]">
              <span className="text-[11px] font-medium text-[#1A2840]">{job.jobRef}</span>
              <span className="text-[11px] text-[#1A2840]">Service Confirmation</span>
              <span className="text-[10px] text-[#6B7280]">[Needs Confirmation]</span>
              <span className="text-[10px] text-[#6B7280]">[Needs Confirmation]</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}