import React from "react";
import { companyDetails, supplierDetails, LOGO_URL } from "@/lib/paymentPackData";
import GrandSummary from "./GrandSummary";
import ConfidentialityBlock from "./ConfidentialityBlock";
import PDFFooter from "./PDFFooter";

export default function GrandSummaryPreview() {
  return (
    <div
      className="bg-white shadow-xl mx-auto font-inter overflow-hidden"
      style={{ width: "210mm", minHeight: "297mm", boxSizing: "border-box" }}
    >
      {/* Dark navy header */}
      <div className="bg-[#0D1F3C] px-10 pt-8 pb-8">
        <div className="flex justify-between items-start">
          <div>
            <img
              src={LOGO_URL}
              alt="Metal X Renewables"
              className="h-12 w-auto object-contain brightness-0 invert mb-4"
            />
            <div className="inline-block bg-[#1E4D99] rounded px-3 py-1">
              <p className="text-[9px] font-bold text-white uppercase tracking-[0.12em]">
                Owens For Scrap — Payment Packs Grand Summary
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold text-[#6B9ED4] uppercase tracking-[0.12em] mb-1">Grand Summary</p>
            <p className="text-[44px] font-bold text-white leading-none tracking-tight">00101–00104</p>
            <p className="text-[11px] text-[#8FA8C8] mt-2">Issued: 08/05/2026</p>
            <p className="text-[11px] text-[#8FA8C8]">All recent collection periods</p>
          </div>
        </div>
      </div>

      {/* Supplier info cards */}
      <div className="grid grid-cols-2 gap-4 px-10 py-6">
        <div className="border border-[#E2E8F0] rounded-xl p-5">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-3">Issued By</p>
          <p className="text-[13px] font-bold text-[#0D1F3C] mb-2">{companyDetails.name}</p>
          <p className="text-[10px] text-[#6B7280]">ABN {companyDetails.abn}</p>
          <p className="text-[10px] text-[#6B7280]">{companyDetails.address}</p>
          <p className="text-[10px] text-[#6B7280]">{companyDetails.email}</p>
        </div>
        <div className="border border-[#E2E8F0] rounded-xl p-5">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-3">Client / Supplier</p>
          <p className="text-[13px] font-bold text-[#0D1F3C] mb-2">{supplierDetails.name}</p>
          <p className="text-[10px] text-[#6B7280]">{supplierDetails.legalName}</p>
          <p className="text-[10px] text-[#6B7280]">ABN {supplierDetails.abn}</p>
          <p className="text-[10px] text-[#6B7280]">{supplierDetails.address}</p>
        </div>
      </div>

      <GrandSummary />
      <ConfidentialityBlock />
      <PDFFooter packId="GRAND" issueDate="08/05/2026" label="Grand Summary — Packs 00101–00104" />
    </div>
  );
}