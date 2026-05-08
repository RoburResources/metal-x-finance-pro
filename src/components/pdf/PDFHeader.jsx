import React from "react";
import { companyDetails, LOGO_URL } from "@/lib/paymentPackData";

export default function PDFHeader({ pack }) {
  return (
    <div>
      {/* Dark navy header */}
      <div className="bg-[#0D1F3C] px-10 pt-8 pb-8">
        <div className="flex justify-between items-start">
          {/* Left: logo + label */}
          <div>
            <img
              src={LOGO_URL}
              alt="Metal X Renewables"
              className="h-12 w-auto object-contain brightness-0 invert mb-4"
            />
            <div className="inline-block bg-[#1E4D99] rounded px-3 py-1">
              <p className="text-[9px] font-bold text-white uppercase tracking-[0.12em]">
                Owens For Scrap — Payment Pack
              </p>
            </div>
          </div>

          {/* Right: reference */}
          <div className="text-right">
            <p className="text-[9px] font-semibold text-[#6B9ED4] uppercase tracking-[0.12em] mb-1">
              Payment Pack Reference
            </p>
            <p className="text-[44px] font-bold text-white leading-none tracking-tight">
              {pack.id}
            </p>
            <p className="text-[11px] text-[#8FA8C8] mt-2">Issued: {pack.issueDate}</p>
            <p className="text-[11px] text-[#8FA8C8]">{pack.period}</p>
          </div>
        </div>
      </div>
    </div>
  );
}