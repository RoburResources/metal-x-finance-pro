import React from "react";
import { companyDetails } from "@/lib/paymentPackData";

export default function PDFHeader({ pack }) {
  return (
    <div>
      {/* Dark navy top bar */}
      <div className="bg-[#0D1F3C] px-8 py-7">
        <div className="flex justify-between items-start">
          {/* Left: Wordmark */}
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
            {/* Document type badge */}
            <div className="mt-4">
              <span className="inline-block bg-[#1E4D99] text-white text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-sm">
                Owens For Scrap Payment Pack
              </span>
            </div>
          </div>

          {/* Right: Pack reference */}
          <div className="text-right">
            <p className="text-[9px] font-bold text-[#8FA8C8] uppercase tracking-[0.1em] mb-1">
              Payment Pack
            </p>
            <p className="text-[28px] font-bold text-white leading-none">
              {pack.id}
            </p>
            <p className="text-[11px] text-[#8FA8C8] mt-2">
              Issued: {pack.issueDate}
            </p>
            <p className="text-[11px] text-[#8FA8C8]">
              Period: {pack.period}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}