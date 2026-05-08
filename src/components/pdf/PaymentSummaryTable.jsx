import React from "react";
import { supplierDetails, companyDetails } from "@/lib/paymentPackData";

const fmt = (v) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function PaymentSummaryTable({ pack, settings = {} }) {
  const {
    showRCTIDetails = true,
    showRemittanceEvidence = true,
  } = settings;
  const s = pack.summary;

  return (
    <div className="px-10 pb-6 space-y-6">
      {/* RCTI */}
      {showRCTIDetails && (
        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">RCTI Details</p>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            <RctiRow label="Supplier" value={`${supplierDetails.legalName} — ABN ${supplierDetails.abn}`} />
            <RctiRow label="Recipient / payer" value={`${companyDetails.name} — ABN ${companyDetails.abn}`} />
            <RctiRow label="Payment pack" value={pack.id} />
            <RctiRow label="GST treatment" value="GST inclusive" />
            <RctiRow label="Weekly total" value={fmt(s.calculatedNetPayable)} bold />
          </div>
        </div>
      )}

      {/* Payment summary */}
      <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">Payment Summary</p>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          <SummaryRow label="Payable tonnes" value={`${s.totalPayableTonnes.toFixed(3)} t`} />
          <SummaryRow label="Material value incl. GST" value={fmt(s.totalMaterialValue)} />
          <SummaryRow label="Transport deductions incl. GST" value={`–${fmt(s.totalTransportDeductions)}`} />
          <SummaryRow label="Alkimos service charges incl. GST" value={s.alkimosServiceCharges > 0 ? `–${fmt(s.alkimosServiceCharges)}` : "$0.00"} />
        </div>
        <div className="bg-[#0D1F3C] px-5 py-4 flex justify-between items-center">
          <p className="text-[11px] font-bold text-white">Final net payable incl. GST</p>
          <p className="text-[22px] font-bold text-white">{fmt(s.calculatedNetPayable)}</p>
        </div>
      </div>

      {/* Remittance evidence */}
      {showRemittanceEvidence && pack.remittance && (
        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em]">Remittance Evidence</p>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            {pack.remittance.paymentSource && <SummaryRow label="Payment source" value={pack.remittance.paymentSource} />}
            {pack.remittance.paidAmount && <SummaryRow label="Paid amount" value={fmt(pack.remittance.paidAmount)} />}
            {pack.remittance.paidDateTime && <SummaryRow label="Paid date/time" value={pack.remittance.paidDateTime} />}
            {pack.remittance.paidTo && <SummaryRow label="Paid to" value={pack.remittance.paidTo} />}
            {pack.remittance.bankReference && <SummaryRow label="Bank reference" value={pack.remittance.bankReference} />}
          </div>
        </div>
      )}

      {/* Payment status */}
      <div className={`rounded-xl px-5 py-4 ${pack.status === "Paid" ? "bg-[#F0FDF4] border border-[#86EFAC]" : "bg-[#FFF7ED] border border-[#FCD34D]"}`}>
        <p className={`text-[10px] font-bold ${pack.status === "Paid" ? "text-[#166534]" : "text-[#92400E]"}`}>
          {pack.statusNote}
        </p>
      </div>
    </div>
  );
}

function RctiRow({ label, value, bold }) {
  return (
    <div className="px-5 py-3 flex justify-between items-center">
      <p className="text-[9px] text-[#6B7280] uppercase tracking-[0.06em]">{label}</p>
      <p className={`text-[10px] text-right ${bold ? "font-bold text-[#0D1F3C]" : "text-[#0D1F3C]"}`}>{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="px-5 py-3 flex justify-between items-center">
      <p className="text-[10px] text-[#6B7280]">{label}</p>
      <p className="text-[10px] font-semibold text-[#0D1F3C]">{value}</p>
    </div>
  );
}