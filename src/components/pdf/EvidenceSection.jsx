import React from "react";

export default function EvidenceSection({ pack }) {
  const allJobs = [...pack.jobs, ...(pack.alkimosJobs || [])];

  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-bold text-[#08111F] uppercase tracking-[0.05em] mb-3">
        Supporting Evidence
      </h3>
      <div className="h-px bg-[#D9DEE7] mb-4" />

      <table className="w-full border border-[#D9DEE7] rounded-sm text-left">
        <thead>
          <tr className="bg-[#F4F7FB]">
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7]">Job Ref</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7]">Evidence Type</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7]">Reference</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2 border-b border-[#D9DEE7]">Status</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((job) => (
            <React.Fragment key={job.jobRef}>
              {job.type === "weighed_material" ? (
                <>
                  <tr className="border-b border-[#D9DEE7]">
                    <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2" rowSpan={3}>{job.jobRef}</td>
                    <td className="text-[8px] text-[#08111F] px-4 py-2">Collection Docket</td>
                    <td className="text-[8px] text-[#6F7472] px-4 py-2">{job.docketNumber}</td>
                    <td className="text-[8px] text-[#6F7472] px-4 py-2">[NEEDS CONFIRMATION]</td>
                  </tr>
                  <tr className="border-b border-[#D9DEE7]">
                    <td className="text-[8px] text-[#08111F] px-4 py-2">DMT Certificate</td>
                    <td className="text-[8px] text-[#6F7472] px-4 py-2">{job.dmtRef}</td>
                    <td className="text-[8px] text-[#6F7472] px-4 py-2">[NEEDS CONFIRMATION]</td>
                  </tr>
                  <tr className="border-b border-[#D9DEE7]">
                    <td className="text-[8px] text-[#08111F] px-4 py-2">GMT Certificate</td>
                    <td className="text-[8px] text-[#6F7472] px-4 py-2">{job.gmtRef}</td>
                    <td className="text-[8px] text-[#6F7472] px-4 py-2">[NEEDS CONFIRMATION]</td>
                  </tr>
                </>
              ) : (
                <tr className="border-b border-[#D9DEE7]">
                  <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2">{job.jobRef}</td>
                  <td className="text-[8px] text-[#08111F] px-4 py-2">Service Confirmation</td>
                  <td className="text-[8px] text-[#6F7472] px-4 py-2">[NEEDS CONFIRMATION]</td>
                  <td className="text-[8px] text-[#6F7472] px-4 py-2">[NEEDS CONFIRMATION]</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}