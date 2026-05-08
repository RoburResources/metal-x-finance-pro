import React from "react";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function JobDetailsSection({ jobs, alkimosJobs }) {
  return (
    <div className="px-8 pb-5">
      {jobs.map((job, i) => (
        <div key={job.jobRef} className="mb-6">
          {/* Job heading */}
          <h3 className="text-[13px] font-bold text-[#0D1F3C] mb-3">
            Job {i + 1} — {job.jobRef}
          </h3>

          {/* Collection detail table */}
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] mb-1.5">Collection Detail</p>
          <table className="w-full text-[10px] border-collapse mb-3">
            <tbody>
              <DetailRow label="Collection / service docket" value={job.docketNumber} label2="Collection date" value2={job.collectionDate} />
              <DetailRow label="Site / reference" value={job.site} label2="Client company" value2="Owens For Scrap" />
              <DetailRow label="Client contact" value="[NEEDS CONFIRMATION]" label2="Phone" value2="0427 531 995" />
              <DetailRow label="Driver" value={job.driver} label2="Vehicle rego" value2={job.vehicleRego} />
              <DetailRow label="Description" value={job.description} label2="Service type" value2="Weighed material" />
            </tbody>
          </table>

          {/* Weights table */}
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] mb-1.5">Direct Measurement / Grading</p>
          <table className="w-full text-[10px] border-collapse mb-3">
            <thead>
              <tr className="bg-[#0D1F3C] text-white">
                {["DMT No.", "GMT No.", "Gross", "Tare", "Net", "Deduction", "Payable"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-[9px] uppercase tracking-[0.06em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border border-[#E2E8F0]">
                <td className="px-3 py-2">{job.dmtRef}</td>
                <td className="px-3 py-2">{job.gmtRef}</td>
                <td className="px-3 py-2">{job.gross.toFixed(3)} t</td>
                <td className="px-3 py-2">{job.tare.toFixed(3)} t</td>
                <td className="px-3 py-2">{job.net.toFixed(3)} t</td>
                <td className="px-3 py-2">{job.deduction.toFixed(3)} t</td>
                <td className="px-3 py-2">{job.payableTonnes.toFixed(3)} t</td>
              </tr>
              <tr className="border border-[#E2E8F0] bg-[#F8FAFC]">
                <td className="px-3 py-1.5 text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.06em]">Material Grade</td>
                <td className="px-3 py-1.5 text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.06em]" colSpan={2}>Rate / Pricing</td>
                <td className="px-3 py-1.5 text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.06em]" colSpan={2}>Gross Value incl. GST</td>
                <td className="px-3 py-1.5 text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.06em]">Deduction incl. GST</td>
                <td className="px-3 py-1.5 text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.06em]">Net Payable incl. GST</td>
              </tr>
              <tr className="border border-[#E2E8F0]">
                <td className="px-3 py-2 font-bold text-[#0D1F3C]">{job.material}</td>
                <td className="px-3 py-2" colSpan={2}>{job.rateLabel}</td>
                <td className="px-3 py-2 font-bold" colSpan={2}>{fmt(job.grossValue)}</td>
                <td className="px-3 py-2">–{fmt(job.transportDeduction)}</td>
                <td className="px-3 py-2 font-bold text-[#0D1F3C]">{fmt(job.netPayable)}</td>
              </tr>
            </tbody>
          </table>

          {/* Evidence */}
          {job.evidence && job.evidence.length > 0 && (
            <div className="mb-1">
              <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] mb-1">Supporting Evidence</p>
              {job.evidence.map((e) => (
                <p key={e} className="text-[9px] text-[#6B7280]">{e}</p>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Alkimos bin service jobs */}
      {alkimosJobs.length > 0 &&
        alkimosJobs.map((job, i) => (
          <div key={job.jobRef} className="mb-6">
            <h3 className="text-[13px] font-bold text-[#0D1F3C] mb-3">
              Job {jobs.length + i + 1} — {job.jobRef}
            </h3>
            <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] mb-1.5">Collection Detail</p>
            <table className="w-full text-[10px] border-collapse mb-3">
              <tbody>
                <DetailRow label="Collection / service docket" value={job.jobRef} label2="Collection date" value2={job.serviceDate} />
                <DetailRow label="Site / reference" value={job.site} label2="Client company" value2="Owens For Scrap" />
                <DetailRow label="Client contact" value="[NEEDS CONFIRMATION]" label2="Phone" value2="0427 531 995" />
                <DetailRow label="Driver" value="[NEEDS CONFIRMATION]" label2="Vehicle rego" value2="[NEEDS CONFIRMATION]" />
                <DetailRow label="Description" value={job.description} label2="Service type" value2="Bin placement / delivery" />
              </tbody>
            </table>

            <table className="w-full text-[10px] border-collapse mb-3">
              <thead>
                <tr className="bg-[#0D1F3C] text-white">
                  {["Service", "DMT/GMT", "Material Value", "Service Charge", "Final"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-[9px] uppercase tracking-[0.06em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#E2E8F0]">
                  <td className="px-3 py-2 font-bold text-[#0D1F3C]">Bin placement / delivery service</td>
                  <td className="px-3 py-2">N/A</td>
                  <td className="px-3 py-2">N/A</td>
                  <td className="px-3 py-2 font-bold">–${job.serviceCharge.toFixed(2)}</td>
                  <td className="px-3 py-2 font-bold text-[#0D1F3C]">–${job.serviceCharge.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {job.evidence && job.evidence.length > 0 && (
              <div className="mb-1">
                <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.08em] mb-1">Supporting Evidence</p>
                {job.evidence.map((e) => (
                  <p key={e} className="text-[9px] text-[#6B7280]">{e}</p>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

function DetailRow({ label, value, label2, value2 }) {
  return (
    <tr className="border border-[#E2E8F0]">
      <td className="px-3 py-2 text-[#4A5568] w-[26%]">{label}</td>
      <td className="px-3 py-2 text-[#0D1F3C] w-[24%]">{value}</td>
      <td className="px-3 py-2 text-[#4A5568] w-[26%]">{label2}</td>
      <td className="px-3 py-2 text-[#0D1F3C] text-right w-[24%]">{value2}</td>
    </tr>
  );
}