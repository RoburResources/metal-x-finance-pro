import React from "react";
import { paymentPacks, grandSummary } from "@/lib/paymentPackData";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function GrandSummary() {
  const g = grandSummary;

  return (
    <div className="px-8 pb-5">
      {/* Pack-by-pack summary */}
      <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-3">Payment Pack Summary</p>
      <table className="w-full text-[10px] border-collapse mb-5">
        <thead>
          <tr className="bg-[#0D1F3C] text-white">
            {["Pack", "Period", "Jobs", "Tonnes", "Final / Status"].map((h) => (
              <th key={h} className="px-3 py-2 text-left font-semibold text-[9px] uppercase tracking-[0.06em]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paymentPacks.map((pack) => {
            const jobRefs = [...pack.jobs.map((j) => j.jobRef), ...pack.alkimosJobs.map((j) => j.jobRef)].join(", ");
            return (
              <tr key={pack.id} className="border border-[#E2E8F0]">
                <td className="px-3 py-2 font-medium text-[#0D1F3C]">{pack.id}</td>
                <td className="px-3 py-2 text-[#4A5568]">{pack.period}</td>
                <td className="px-3 py-2 text-[#4A5568]">{jobRefs}</td>
                <td className="px-3 py-2 text-[#0D1F3C]">{pack.summary.totalPayableTonnes.toFixed(3)} t</td>
                <td className="px-3 py-2 text-right font-medium text-[#0D1F3C]">
                  {pack.summary.conflictNote
                    ? `Controlled ${fmt(pack.summary.calculatedNetPayable)}; remitted ${fmt(pack.summary.remittancePaid)}`
                    : fmt(pack.summary.calculatedNetPayable)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Grand totals */}
      <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-3">Grand Totals</p>
      <table className="w-full text-[10px] border-collapse">
        <thead>
          <tr className="bg-[#0D1F3C] text-white">
            <th className="px-3 py-2 text-left font-semibold text-[9px] uppercase tracking-[0.06em]">Grand Total Field</th>
            <th className="px-3 py-2 text-right font-semibold text-[9px] uppercase tracking-[0.06em]">Value</th>
          </tr>
        </thead>
        <tbody>
          <GRow label="Total payment packs" value={g.totalPacks} />
          <GRow label="Total payable tonnes" value={`${g.totalPayableTonnes.toFixed(3)} t`} />
          <GRow label="Total material value" value={fmt(g.totalMaterialValue)} />
          <GRow label="Total transport deductions" value={`–${fmt(g.totalTransportDeductions)}`} />
          <GRow label="Total Alkimos service charges" value={`–${fmt(g.totalAlkimosCharges)}`} />
          <GRow label="Controlled final net payable total" value={fmt(g.controlledNetPayable)} />
          <GRow label="Total paid by remittance evidence" value={fmt(g.totalPaidByRemittance)} />
          <GRow label="Total outstanding payable to Owens" value={fmt(g.totalOutstandingPayable)} bold />
        </tbody>
      </table>
    </div>
  );
}

function GRow({ label, value, bold }) {
  return (
    <tr className="border border-[#E2E8F0]">
      <td className={`px-3 py-2 ${bold ? "font-bold text-[#0D1F3C]" : "text-[#4A5568]"}`}>{label}</td>
      <td className={`px-3 py-2 text-right ${bold ? "font-bold text-[#0D1F3C]" : "text-[#0D1F3C]"}`}>{value}</td>
    </tr>
  );
}