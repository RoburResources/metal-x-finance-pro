import React from "react";
import { grandSummary, paymentPacks } from "@/lib/paymentPackData";

export default function GrandSummary() {
  const fmt = (v) => `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-bold text-[#08111F] uppercase tracking-[0.05em] mb-3">
        Grand Summary — All Payment Packs
      </h3>
      <div className="h-px bg-[#D9DEE7] mb-4" />

      {/* Overview stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="TOTAL PACKS" value={grandSummary.totalPacks} />
        <StatCard label="PAID" value={grandSummary.paidPacks} accent />
        <StatCard label="OUTSTANDING" value={grandSummary.outstandingPacks} highlight />
        <StatCard label="GRAND TOTAL" value={fmt(grandSummary.grandTotal)} />
      </div>

      {/* Pack-by-pack summary table */}
      <table className="w-full border border-[#D9DEE7] rounded-sm text-left mb-4">
        <thead>
          <tr className="bg-[#F4F7FB]">
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7]">Pack</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7]">Period</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7]">Status</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7] text-right">Tonnes</th>
            <th className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[#D9DEE7] text-right">Net Payable</th>
          </tr>
        </thead>
        <tbody>
          {paymentPacks.map((pack) => (
            <tr key={pack.id} className="border-b border-[#D9DEE7]">
              <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2.5">{pack.id}</td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5">{pack.period}</td>
              <td className="px-4 py-2.5">
                <span className={`text-[8px] font-semibold px-2 py-0.5 rounded ${
                  pack.status === "Paid"
                    ? "bg-[#F4F7FB] text-[#1E4D99] border border-[#D9DEE7]"
                    : "bg-[#0B1929] text-white"
                }`}>
                  {pack.status}
                </span>
              </td>
              <td className="text-[8.5px] text-[#08111F] px-4 py-2.5 text-right">
                {pack.summary.totalPayableTonnes.toFixed(2)}
              </td>
              <td className="text-[8.5px] font-medium text-[#08111F] px-4 py-2.5 text-right">
                {fmt(pack.summary.calculatedNetPayable)}
              </td>
            </tr>
          ))}
          {/* Grand total row */}
          <tr className="bg-[#F4F7FB] border-t-2 border-[#D9DEE7]">
            <td colSpan={3} className="text-[8.5px] font-bold text-[#08111F] uppercase tracking-[0.03em] px-4 py-3">
              Grand Total
            </td>
            <td className="text-[8.5px] font-bold text-[#08111F] px-4 py-3 text-right">
              {paymentPacks.reduce((sum, p) => sum + p.summary.totalPayableTonnes, 0).toFixed(2)}
            </td>
            <td className="text-[9.5px] font-bold text-[#08111F] px-4 py-3 text-right">
              {fmt(grandSummary.grandTotal)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Outstanding callout */}
      <div className="border border-[#1E4D99] rounded-sm p-4 bg-[#0B1929]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[7.5px] font-bold text-[#D9DEE7] uppercase tracking-[0.05em]">
              TOTAL OUTSTANDING
            </p>
            <p className="text-[8px] text-[#D9DEE7] mt-1">
              Payable by Metal X to Owens For Scrap
            </p>
          </div>
          <p className="text-[16px] font-bold text-white">
            {fmt(grandSummary.totalOutstandingAmount)}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent, highlight }) {
  const bg = highlight ? "bg-[#0B1929]" : accent ? "bg-[#F4F7FB]" : "bg-white";
  const border = highlight ? "border-[#1E4D99]" : "border-[#D9DEE7]";
  const labelColor = highlight ? "text-[#D9DEE7]" : "text-[#6F7472]";
  const valueColor = highlight ? "text-white" : "text-[#08111F]";

  return (
    <div className={`${bg} border ${border} rounded-sm p-3`}>
      <p className={`text-[7px] font-bold uppercase tracking-[0.05em] ${labelColor}`}>{label}</p>
      <p className={`text-[13px] font-bold mt-1 ${valueColor}`}>{value}</p>
    </div>
  );
}