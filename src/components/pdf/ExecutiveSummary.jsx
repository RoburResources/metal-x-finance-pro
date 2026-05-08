import React from "react";

const fmt = (v) =>
  v != null
    ? `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

export default function ExecutiveSummary({ pack }) {
  const s = pack.summary;

  return (
    <div className="px-8 pb-5">
      <div className="border-b border-[#E2E8F0] mb-4" />

      <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-3">Executive Summary</p>

      <table className="w-full text-[10px] border-collapse mb-4">
        <tbody>
          <SummaryRow label="Payment pack" value={pack.id} label2="Payment status" value2={pack.statusNote} />
          <SummaryRow
            label="Weighed material jobs"
            value={s.weighedMaterialJobs}
            label2="Bin service jobs"
            value2={s.binServiceJobs}
          />
          <SummaryRow
            label="Payable tonnes"
            value={`${s.totalPayableTonnes.toFixed(3)} t`}
            label2="Material value incl. GST"
            value2={fmt(s.totalMaterialValue)}
          />
          <SummaryRow
            label="Transport deductions incl. GST"
            value={`–${fmt(s.totalTransportDeductions)}`}
            label2="Alkimos charges incl. GST"
            value2={s.alkimosServiceCharges > 0 ? `–${fmt(s.alkimosServiceCharges)}` : "$0.00"}
          />
          <tr className="border border-[#E2E8F0] bg-[#F8FAFC]">
            <td className="px-3 py-2.5 font-bold text-[#0D1F3C]">Final net payable incl. GST</td>
            <td className="px-3 py-2.5" />
            <td className="px-3 py-2.5" />
            <td className="px-3 py-2.5 font-bold text-[#0D1F3C] text-right">
              {fmt(s.calculatedNetPayable)}
            </td>
          </tr>
        </tbody>
      </table>

      {s.conflictNote && (
        <div className="border border-[#FCA5A5] bg-[#FFF5F5] rounded p-3 mt-2">
          <p className="text-[9px] font-bold text-[#DC2626] uppercase tracking-[0.08em] mb-1">Calculation Conflict — Reference</p>
          <p className="text-[10px] text-[#7F1D1D]">{s.conflictNote}</p>
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value, label2, value2 }) {
  return (
    <tr className="border border-[#E2E8F0]">
      <td className="px-3 py-2 text-[#4A5568] w-[28%]">{label}</td>
      <td className="px-3 py-2 text-[#0D1F3C] w-[22%]">{value}</td>
      <td className="px-3 py-2 text-[#4A5568] w-[28%]">{label2}</td>
      <td className="px-3 py-2 text-[#0D1F3C] text-right w-[22%]">{value2}</td>
    </tr>
  );
}