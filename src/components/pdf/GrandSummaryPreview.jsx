import React from "react";
import { companyDetails } from "@/lib/paymentPackData";
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
      <div className="bg-[#0D1F3C] px-8 py-7">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-none tracking-tight">
              Metal X Renewables
            </h1>
            <p className="text-[12px] text-[#8FA8C8] mt-1">
              Pty Ltd | ABN {companyDetails.abn}
            </p>
            <p className="text-[11px] text-[#4A90D9] mt-0.5 font-medium">
              {companyDetails.tagline}
            </p>
            <div className="mt-4">
              <span className="inline-block bg-[#1E4D99] text-white text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-sm">
                Grand Payment Summary
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-[#8FA8C8] uppercase tracking-[0.1em] mb-1">
              Document
            </p>
            <p className="text-[22px] font-bold text-white leading-none">
              Owens For Scrap
            </p>
            <p className="text-[11px] text-[#8FA8C8] mt-2">Issued: 08/05/2026</p>
            <p className="text-[11px] text-[#8FA8C8]">All Periods Combined</p>
          </div>
        </div>
      </div>

      {/* Issuer row */}
      <div className="px-8 py-6">
        <div className="border border-[#D9DEE7] rounded-lg p-5">
          <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em] mb-2">
            Issued By
          </p>
          <p className="text-[13px] font-bold text-[#0D1F3C] mb-1">{companyDetails.name}</p>
          <p className="text-[11px] text-[#4A5568]">ABN {companyDetails.abn}</p>
          <p className="text-[11px] text-[#4A5568]">Perth, Western Australia &nbsp;|&nbsp; {companyDetails.email}</p>
        </div>
      </div>

      <GrandSummary />
      <ConfidentialityBlock />
      <PDFFooter packId="GRAND" issueDate="08/05/2026" />
    </div>
  );
}