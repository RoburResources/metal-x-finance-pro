import React from "react";
import { companyDetails } from "@/lib/paymentPackData";

export default function PDFFooter({ packId, issueDate, label }) {
  return (
    <div className="bg-[#0D1F3C] px-10 py-5 flex justify-between items-center">
      <div>
        <p className="text-[11px] font-bold text-white">{companyDetails.name}</p>
        <p className="text-[9px] text-[#8FA8C8] mt-0.5">
          ABN {companyDetails.abn} &nbsp;|&nbsp; {companyDetails.email} &nbsp;|&nbsp; Perth, Western Australia
        </p>
      </div>
      <div className="text-right">
        <p className="text-[9px] text-[#8FA8C8]">
          {label || `Payment Pack ${packId}`} &nbsp;|&nbsp; Issued {issueDate}
        </p>
      </div>
    </div>
  );
}