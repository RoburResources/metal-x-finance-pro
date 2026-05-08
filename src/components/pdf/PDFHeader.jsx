import React from "react";
import { companyDetails, LOGO_URL } from "@/lib/paymentPackData";

export default function PDFHeader({ pack }) {
  return (
    <div>
      {/* White top bar with logo + company info */}
      <div className="px-8 pt-6 pb-4 flex justify-between items-start border-b border-[#E2E8F0]">
        <div className="flex items-start gap-4">
          <img
            src={LOGO_URL}
            alt="Metal X Renewables"
            className="h-14 w-auto object-contain"
          />
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#6B7280]">{companyDetails.name}</p>
          <p className="text-[10px] text-[#6B7280]">ABN {companyDetails.abn}</p>
          <p className="text-[10px] text-[#6B7280]">{companyDetails.tagline}</p>
        </div>
      </div>

      {/* Pack reference band */}
      <div className="bg-[#0D1F3C] px-8 py-5 flex justify-between items-start">
        <div>
          <p className="text-[9px] font-bold text-[#8FA8C8] uppercase tracking-[0.12em] mb-1">
            Owens For Scrap Payment Pack
          </p>
          <p className="text-[11px] text-[#8FA8C8]">
            Period: {pack.period}
          </p>
          <p className="text-[11px] text-[#8FA8C8]">
            Status: {pack.statusNote}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-[#8FA8C8] uppercase tracking-[0.1em] mb-1">
            Payment Pack Reference
          </p>
          <p className="text-[36px] font-bold text-white leading-none tracking-tight">
            {pack.id}
          </p>
          <p className="text-[10px] text-[#8FA8C8] mt-1">Issued: {pack.issueDate}</p>
        </div>
      </div>
    </div>
  );
}