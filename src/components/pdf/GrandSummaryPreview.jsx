import React from "react";
import { companyDetails } from "@/lib/paymentPackData";
import GrandSummary from "./GrandSummary";
import ConfidentialityBlock from "./ConfidentialityBlock";
import PDFFooter from "./PDFFooter";

export default function GrandSummaryPreview() {
  return (
    <div
      className="bg-white shadow-xl mx-auto font-inter"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm 18mm 16mm 18mm",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-[15px] font-bold text-[#08111F] tracking-wide">
              {companyDetails.name}
            </h2>
            <p className="text-[9px] text-[#6F7472] mt-0.5">
              Trading as {companyDetails.tradingAs}
            </p>
            <p className="text-[9px] text-[#6F7472]">ABN {companyDetails.abn}</p>
            <p className="text-[8px] text-[#1E4D99] font-medium tracking-[0.08em] mt-2 uppercase">
              {companyDetails.tagline}
            </p>
          </div>
          <div className="w-[120px] h-[48px] border border-[#D9DEE7] rounded flex items-center justify-center bg-[#F4F7FB]">
            <span className="text-[7px] text-[#6F7472] uppercase tracking-widest font-semibold">Metal X</span>
          </div>
        </div>

        <div className="h-px bg-[#D9DEE7] mb-6" />

        <h1 className="text-[20px] font-bold text-[#08111F] tracking-[0.04em] uppercase mb-4">
          Owens For Scrap — Grand Summary
        </h1>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em] mb-1">DOCUMENT TYPE</p>
            <p className="text-[9.5px] font-semibold text-[#08111F]">Grand Payment Summary</p>
          </div>
          <div>
            <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em] mb-1">ISSUED</p>
            <p className="text-[9.5px] font-semibold text-[#08111F]">08/05/2026</p>
          </div>
          <div>
            <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em] mb-1">CLIENT</p>
            <p className="text-[9.5px] font-semibold text-[#08111F]">Owens For Scrap</p>
          </div>
        </div>
      </div>

      <GrandSummary />
      <ConfidentialityBlock />
      <PDFFooter packId="GRAND" issueDate="08/05/2026" />
    </div>
  );
}