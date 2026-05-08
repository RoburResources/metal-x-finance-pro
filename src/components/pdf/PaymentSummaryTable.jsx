import React from "react";

export default function PaymentSummaryTable({ pack }) {
  const fmt = (v) => `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const allJobs = [...pack.jobs, ...pack.alkimosJobs];

  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-bold text-[#08111F] uppercase tracking-[0.05em] mb-3">
        Payment Summary
      </h3>
      <div className="h-px bg-[#D9DEE7] mb-4" />

      <table className="w-full border border-[#D9DEE7] rounded-sm text-left">
        <thead>
          <tr className="bg-[#F4F7FB]">
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7]">Job Ref</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7]">Type</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7]">Material</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7] text-right">Tonnes</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7] text-right">Gross</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7] text-right">Deductions</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7] text-right">Net Payable</th>
          </tr>
        </thead>
        <tbody>
          {pack.jobs.map((job) => (
            <tr key={job.jobRef} className="border-b border-[#D9DEE7]">
              <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2.5">{job.jobRef}</td>
              <td className="text-[8px] text-[#6F7472] px-4 py-2.5">Weighed Material</td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5">{job.material}</td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 text-right">{job.tonnes.toFixed(2)}</td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 text-right">{fmt(job.grossValue)}</td>
              <td className="text-[8.5px] text-[#6F7472] px-4 py-2.5 text-right">– {fmt(job.transportDeduction)}</td>
              <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2.5 text-right">{fmt(job.netPayable)}</td>
            </tr>
          ))}
          {pack.alkimosJobs.map((job) => (
            <tr key={job.jobRef} className="border-b border-[#D9DEE7]">
              <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2.5">{job.jobRef}</td>
              <td className="text-[8px] text-[#6F7472] px-4 py-2.5">Bin Service</td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5">—</td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 text-right">—</td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 text-right">{fmt(job.serviceCharge)}</td>
              <td className="text-[8.5px] text-[#6F7472] px-4 py-2.5 text-right">—</td>
              <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2.5 text-right">{fmt(job.serviceCharge)}</td>
            </tr>
          ))}
          {/* Total row */}
          <tr className="bg-[#F4F7FB] border-t-2 border-[#D9DEE7]">
            <td colSpan={3} className="text-[8.5px] font-bold text-[#08111F] uppercase tracking-[0.03em] px-4 py-3">
              Total — Pack {pack.id}
            </td>
            <td className="text-[8.5px] font-bold text-[#08111F] px-4 py-3 text-right">
              {pack.summary.totalPayableTonnes.toFixed(2)}
            </td>
            <td className="text-[8.5px] font-bold text-[#08111F] px-4 py-3 text-right">
              {fmt(pack.summary.totalMaterialValue + pack.summary.alkimosServiceCharges)}
            </td>
            <td className="text-[8.5px] font-bold text-[#6F7472] px-4 py-3 text-right">
              – {fmt(pack.summary.totalTransportDeductions)}
            </td>
            <td className="text-[9.5px] font-bold text-[#08111F] px-4 py-3 text-right">
              {fmt(pack.summary.calculatedNetPayable)}
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-[7.5px] text-[#6F7472] mt-2">
        All values {pack.jobs[0]?.gst || "incl. GST"} &nbsp;|&nbsp; Metal X pays Owens For Scrap
      </p>
    </div>
  );
}