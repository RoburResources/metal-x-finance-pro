import React from "react";

export default function JobDetailsSection({ jobs, alkimosJobs }) {
  const fmt = (v) => `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-bold text-[#08111F] uppercase tracking-[0.05em] mb-3">
        Job Details
      </h3>
      <div className="h-px bg-[#D9DEE7] mb-5" />

      {/* Weighed Material Jobs */}
      {jobs.map((job, i) => (
        <div key={job.jobRef} className="mb-6">
          <h4 className="text-[9.5px] font-bold text-[#0B1929] mb-3 tracking-[0.02em]">
            JOB {i + 1} — {job.jobRef}
          </h4>

          {/* Collection/Service Details */}
          <div className="border border-[#D9DEE7] rounded-sm overflow-hidden mb-3">
            <div className="bg-[#F4F7FB] px-4 py-2 border-b border-[#D9DEE7]">
              <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em]">
                Collection / Service Details
              </p>
            </div>
            <div className="px-4 py-3 grid grid-cols-3 gap-4">
              <MetaItem label="DESCRIPTION" value={job.description} />
              <MetaItem label="MATERIAL" value={job.material} />
              <MetaItem label="SITE" value={job.site} />
              <MetaItem label="COLLECTION DATE" value={job.collectionDate} />
              <MetaItem label="DOCKET NO." value={job.docketNumber} />
              <MetaItem label="GST STATUS" value={job.gst} />
            </div>
          </div>

          {/* DMT/GMT Details */}
          <div className="border border-[#D9DEE7] rounded-sm overflow-hidden mb-3">
            <div className="bg-[#F4F7FB] px-4 py-2 border-b border-[#D9DEE7]">
              <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em]">
                Direct Measurement / Grading
              </p>
            </div>
            <div className="px-4 py-3 grid grid-cols-3 gap-4">
              <MetaItem label="DMT REF" value={job.dmtRef} />
              <MetaItem label="GMT REF" value={job.gmtRef} />
              <MetaItem label="TONNES" value={`${job.tonnes.toFixed(2)} t`} />
            </div>
          </div>

          {/* Financial Summary Table */}
          <table className="w-full border border-[#D9DEE7] rounded-sm text-left">
            <thead>
              <tr className="bg-[#F4F7FB]">
                <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7]">Item</th>
                <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7] text-right">Rate</th>
                <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7] text-right">Tonnes</th>
                <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7] text-right">Gross Value</th>
                <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7] text-right">Transport Ded.</th>
                <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7] text-right">Net Payable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 border-b border-[#D9DEE7]">{job.material}</td>
                <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 border-b border-[#D9DEE7] text-right">{fmt(job.rate)}/t</td>
                <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 border-b border-[#D9DEE7] text-right">{job.tonnes.toFixed(2)}</td>
                <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 border-b border-[#D9DEE7] text-right">{fmt(job.grossValue)}</td>
                <td className="text-[8.5px] text-[#6F7472] px-4 py-2.5 border-b border-[#D9DEE7] text-right">– {fmt(job.transportDeduction)}</td>
                <td className="text-[8.5px] font-bold text-[#08111F] px-4 py-2.5 border-b border-[#D9DEE7] text-right">{fmt(job.netPayable)}</td>
              </tr>
              <tr className="bg-[#F4F7FB]">
                <td colSpan={5} className="text-[8px] font-bold text-[#08111F] uppercase tracking-[0.03em] px-4 py-2 border-t border-[#D9DEE7]">
                  Job Total
                </td>
                <td className="text-[9px] font-bold text-[#08111F] px-4 py-2 text-right border-t border-[#D9DEE7]">
                  {fmt(job.netPayable)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Alkimos Service Jobs */}
      {alkimosJobs.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[9.5px] font-bold text-[#0B1929] mb-3 tracking-[0.02em]">
            ALKIMOS BIN SERVICES
          </h4>
          {alkimosJobs.map((job) => (
            <div key={job.jobRef} className="border border-[#D9DEE7] rounded-sm overflow-hidden mb-3">
              <div className="bg-[#F4F7FB] px-4 py-2 border-b border-[#D9DEE7]">
                <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em]">
                  {job.jobRef} — Bin Placement / Delivery Service
                </p>
              </div>
              <div className="px-4 py-3 grid grid-cols-3 gap-4">
                <MetaItem label="SITE" value={job.site} />
                <MetaItem label="SERVICE DATE" value={job.serviceDate} />
                <MetaItem label="GST STATUS" value={job.gst} />
              </div>
              <div className="px-4 py-2.5 border-t border-[#D9DEE7] bg-[#F4F7FB] flex justify-between items-center">
                <span className="text-[8px] text-[#6F7472]">{job.note}</span>
                <span className="text-[9px] font-bold text-[#08111F]">{`$${job.serviceCharge.toFixed(2)}`}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <p className="text-[7px] font-bold text-[#6F7472] uppercase tracking-[0.04em]">{label}</p>
      <p className="text-[8.5px] text-[#08111F] mt-0.5 font-medium">{value}</p>
    </div>
  );
}