import React from "react";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function JobDetailsSection({ jobs, alkimosJobs }) {
  const allJobs = [
    ...jobs.map((j) => ({ ...j, _type: "weighed" })),
    ...alkimosJobs.map((j) => ({ ...j, _type: "alkimos" })),
  ];

  return (
    <div className="px-10 pb-6 space-y-6">
      {allJobs.map((job, i) => (
        <div key={job.jobRef} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
          {/* Job header */}
          <div className="px-5 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
            <div>
              <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-0.5">
                Job {i + 1}
              </p>
              <p className="text-[13px] font-bold text-[#0D1F3C]">{job.jobRef}</p>
            </div>
            <span className="text-[9px] font-semibold text-[#6B7280] bg-[#F3F4F6] rounded-full px-3 py-1 uppercase tracking-wide">
              {job._type === "alkimos" ? "Bin Service" : "Weighed Material"}
            </span>
          </div>

          {/* Collection detail */}
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3">Collection Detail</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {job._type === "weighed" ? (
                <>
                  <DetailPair label="Docket" value={job.docketNumber} />
                  <DetailPair label="Collection date" value={job.collectionDate} />
                  <DetailPair label="Site" value={job.site} />
                  <DetailPair label="Client company" value="Owens For Scrap" />
                  <DetailPair label="Driver" value={job.driver} />
                  <DetailPair label="Vehicle rego" value={job.vehicleRego} />
                  <DetailPair label="Description" value={job.description} />
                  <DetailPair label="Service type" value="Weighed material" />
                </>
              ) : (
                <>
                  <DetailPair label="Job ref" value={job.jobRef} />
                  <DetailPair label="Service date" value={job.serviceDate} />
                  <DetailPair label="Site" value={job.site} />
                  <DetailPair label="Client company" value="Owens For Scrap" />
                  <DetailPair label="Description" value={job.description} />
                  <DetailPair label="Service type" value="Bin placement / delivery" />
                </>
              )}
            </div>
          </div>

          {/* Weights / pricing */}
          {job._type === "weighed" ? (
            <div className="px-5 py-4">
              <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3">Measurement & Pricing</p>
              {/* Weight row */}
              <div className="grid grid-cols-7 mb-2">
                {["DMT No.", "GMT No.", "Gross", "Tare", "Net", "Deduction", "Payable"].map((h) => (
                  <p key={h} className="text-[8px] font-semibold text-[#9CA3AF] uppercase tracking-[0.06em]">{h}</p>
                ))}
              </div>
              <div className="grid grid-cols-7 bg-[#F8FAFC] rounded-lg px-0 py-2 mb-4">
                {[job.dmtRef, job.gmtRef, `${job.gross.toFixed(3)} t`, `${job.tare.toFixed(3)} t`, `${job.net.toFixed(3)} t`, `${job.deduction.toFixed(3)} t`, `${job.payableTonnes.toFixed(3)} t`].map((v, i) => (
                  <p key={i} className="text-[10px] text-[#0D1F3C] px-2 py-1">{v}</p>
                ))}
              </div>
              {/* Pricing row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-1">Material</p>
                  <p className="text-[10px] font-bold text-[#0D1F3C]">{job.material}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-1">Rate</p>
                  <p className="text-[10px] font-bold text-[#0D1F3C]">{job.rateLabel}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-1">Gross value incl. GST</p>
                  <p className="text-[10px] font-bold text-[#0D1F3C]">{fmt(job.grossValue)}</p>
                </div>
              </div>
              {/* Net payable strip */}
              <div className="flex justify-between items-center bg-[#0D1F3C] rounded-lg px-4 py-3 mt-3">
                <div>
                  <p className="text-[8px] text-[#8FA8C8]">Transport deduction</p>
                  <p className="text-[10px] text-[#8FA8C8]">–{fmt(job.transportDeduction)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#8FA8C8] mb-0.5">Net payable incl. GST</p>
                  <p className="text-[16px] font-bold text-white">{fmt(job.netPayable)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 py-4">
              <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3">Service Charge</p>
              <div className="flex justify-between items-center bg-[#0D1F3C] rounded-lg px-4 py-3">
                <p className="text-[10px] text-[#8FA8C8]">Bin placement / delivery service charge incl. GST</p>
                <p className="text-[16px] font-bold text-white">–${job.serviceCharge.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DetailPair({ label, value }) {
  return (
    <div>
      <p className="text-[8px] text-[#9CA3AF] uppercase tracking-[0.06em] mb-0.5">{label}</p>
      <p className="text-[10px] text-[#0D1F3C]">{value}</p>
    </div>
  );
}