import React from "react";
import { supplierDetails, companyDetails } from "@/lib/paymentPackData";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function PaymentSummaryTable({ pack }) {
  const s = pack.summary;

  return (
    <div className="px-8 pb-5">
      <div className="border-t border-[#E2E8F0] mb-5" />

      {/* RCTI Section */}
      <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-3">RCTI Section</p>
      <table className="w-full text-[10px] border-collapse mb-5">
        <tbody>
          <RctiRow label="Supplier" value={`${supplierDetails.legalName} — ABN ${supplierDetails.abn}`} />
          <RctiRow label="Recipient / payer" value={`${companyDetails.name} — ABN ${companyDetails.abn}`} />
          <RctiRow label="Payment pack" value={pack.id} />
          <RctiRow label="GST treatment" value="GST inclusive" />
          <RctiRow label="Weekly total" value={fmt(s.calculatedNetPayable)} />
          <RctiRow label="Declaration wording" value="[NEEDS CONFIRMATION] Exact RCTI legal declaration wording not supplied." />
        </tbody>
      </table>

      {/* Payment Summary */}
      <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-3">Payment Summary</p>
      <table className="w-full text-[10px] border-collapse">
        <thead>
          <tr className="bg-[#0D1F3C] text-white">
            <th className="px-3 py-2 text-left font-semibold text-[9px] uppercase tracking-[0.06em]">Metric</th>
            <th className="px-3 py-2 text-right font-semibold text-[9px] uppercase tracking-[0.06em]">Amount</th>
          </tr>
        </thead>
        <tbody>
          <SummaryRow label={`Total payable tonnes`} value={`${s.totalPayableTonnes.toFixed(3)} t`} />
          <SummaryRow label="Material value incl. GST" value={fmt(s.totalMaterialValue)} />
          <SummaryRow label="Transport deductions incl. GST" value={`–${fmt(s.totalTransportDeductions)}`} />
          <SummaryRow label="Alkimos service charges incl. GST" value={s.alkimosServiceCharges > 0 ? `–${fmt(s.alkimosServiceCharges)}` : "$0.00"} />
          <SummaryRow label="Final net payable incl. GST" value={fmt(s.calculatedNetPayable)} bold />
          {pack.remittance && (
            <SummaryRow label="Remittance paid amount" value={fmt(pack.remittance.paidAmount)} />
          )}
          {pack.remittance?.bankReference && (
            <SummaryRow label="Remittance reference" value={pack.remittance.bankReference} />
          )}
          <SummaryRow label="Payment status" value={pack.statusNote} bold />
        </tbody>
      </table>

      {/* Remittance evidence for paid packs */}
      {pack.remittance && pack.status === "Paid" && (
        <div className="mt-4">
          <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-2">Remittance Evidence</p>
          <table className="w-full text-[10px] border-collapse">
            <tbody>
              {pack.remittance.paymentSource && <SummaryRow label="Payment source" value={pack.remittance.paymentSource} />}
              {pack.remittance.paidAmount && <SummaryRow label="Paid amount" value={fmt(pack.remittance.paidAmount)} />}
              {pack.remittance.paidDateTime && <SummaryRow label="Paid date/time" value={pack.remittance.paidDateTime} />}
              {pack.remittance.paidTo && <SummaryRow label="Paid to" value={pack.remittance.paidTo} />}
              {pack.remittance.bankReference && <SummaryRow label="Bank reference" value={pack.remittance.bankReference} />}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RctiRow({ label, value }) {
  return (
    <tr className="border border-[#E2E8F0]">
      <td className="px-3 py-2 text-[#4A5568] w-[35%]">{label}</td>
      <td className="px-3 py-2 text-[#0D1F3C] text-right">{value}</td>
    </tr>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <tr className="border border-[#E2E8F0]">
      <td className={`px-3 py-2 ${bold ? "font-bold text-[#0D1F3C]" : "text-[#4A5568]"} w-[60%]`}>{label}</td>
      <td className={`px-3 py-2 text-right ${bold ? "font-bold text-[#0D1F3C]" : "text-[#0D1F3C]"}`}>{value}</td>
    </tr>
  );
}