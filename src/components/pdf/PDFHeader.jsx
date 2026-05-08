import React from "react";
import { companyDetails } from "@/lib/paymentPackData";

export default function PDFHeader({ pack }) {
  const statusColor = pack.status === "Paid"
    ? "text-[#1E4D99]"
    : "text-[#08111F]";

  const statusBg = pack.status === "Paid"
    ? "bg-[#F4F7FB] border-[#D9DEE7]"
    : "bg-[#F4F7FB] border-[#1E4D99]";

  return (
    <div className="mb-8">
      {/* Company Identity */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[15px] font-bold text-[#08111F] tracking-wide">
            {companyDetails.name}
          </h2>
          <p className="text-[9px] text-[#6F7472] mt-0.5">
            Trading as {companyDetails.tradingAs}
          </p>
          <p className="text-[9px] text-[#6F7472]">
            ABN {companyDetails.abn}
          </p>
          <p className="text-[9px] text-[#6F7472]">
            {companyDetails.address}
          </p>
          <p className="text-[9px] text-[#6F7472]">
            {companyDetails.email} &nbsp;|&nbsp; {companyDetails.phone}
          </p>
          <p className="text-[8px] text-[#1E4D99] font-medium tracking-[0.08em] mt-2 uppercase">
            {companyDetails.tagline}
          </p>
        </div>

        {/* Logo placeholder area */}
        <div className="w-[120px] h-[48px] border border-[#D9DEE7] rounded flex items-center justify-center bg-[#F4F7FB]">
          <span className="text-[7px] text-[#6F7472] uppercase tracking-widest font-semibold">Metal X</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D9DEE7] mb-6" />

      {/* Document Title */}
      <h1 className="text-[20px] font-bold text-[#08111F] tracking-[0.04em] uppercase mb-5">
        Owens For Scrap Payment Pack
      </h1>

      {/* Metadata Row */}
      <div className="grid grid-cols-4 gap-6">
        <MetaBlock label="PAYMENT PACK NO." value={pack.id} />
        <MetaBlock label="ISSUED" value={pack.issueDate} />
        <MetaBlock label="PERIOD" value={pack.period} />
        <div>
          <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em] mb-1">
            STATUS
          </p>
          <div className={`inline-flex items-center px-2.5 py-1 rounded border text-[9px] font-semibold ${statusBg} ${statusColor}`}>
            {pack.status}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaBlock({ label, value }) {
  return (
    <div>
      <p className="text-[7.5px] font-bold text-[#6F7472] uppercase tracking-[0.05em] mb-1">
        {label}
      </p>
      <p className="text-[9.5px] font-semibold text-[#08111F]">{value}</p>
    </div>
  );
}