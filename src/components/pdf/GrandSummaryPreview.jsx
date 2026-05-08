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
      {/* White top bar with logo */}
      <div className="px-8 pt-6 pb-4 flex justify-between items-start border-b border-[#E2E8F0]">
        <img
          src={LOGO_URL}
          alt="Metal X Renewables"
          className="h-14 w-auto object-contain"
        />
        <div className="text-right">
          <p className="text-[10px] text-[#6B7280]">{companyDetails.name}</p>
          <p className="text-[10px] text-[#6B7280]">ABN {companyDetails.abn}</p>
          <p className="text-[10px] text-[#6B7280]">{companyDetails.tagline}</p>
        </div>
      </div>

      {/* Grand Summary reference band */}
      <div className="bg-[#0D1F3C] px-8 py-5 flex justify-between items-start">
        <div>
          <p className="text-[9px] font-bold text-[#8FA8C8] uppercase tracking-[0.12em] mb-1">
            Owens For Scrap Payment Pack
          </p>
          <p className="text-[11px] text-[#8FA8C8]">Period: All recent collection periods</p>
          <p className="text-[11px] text-[#8FA8C8]">Status: Summary</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-[#8FA8C8] uppercase tracking-[0.1em] mb-1">Grand Summary</p>
          <p className="text-[36px] font-bold text-white leading-none tracking-tight">00101–00104</p>
          <p className="text-[10px] text-[#8FA8C8] mt-1">Issued: 08/05/2026</p>
        </div>
      </div>

      {/* Client heading */}
      <div className="px-8 pt-5 pb-3">
        <p className="text-[14px] font-bold text-[#0D1F3C]">{supplierDetails.name}</p>
      </div>

      <GrandSummary />
      <ConfidentialityBlock />
      <PDFFooter packId="GRAND" issueDate="08/05/2026" label="Grand Summary" />
    </div>
  );
}