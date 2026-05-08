import React from "react";
import { companyDetails } from "@/lib/paymentPackData";

export default function PDFFooter({ packId, issueDate, label }) {
  return (
    <div className="bg-[#0D1F3C] px-8 py-4 flex justify-between items-center mt-auto">
      <div>
        <p className="text-[10px] text-white font-medium">{companyDetails.name}</p>
        <p className="text-[9px] text-[#8FA8C8]">
          ABN {companyDetails.abn} &nbsp;|&nbsp; {companyDetails.email} &nbsp;|&nbsp; Perth, Western Australia
        </p>
      </div>
      <div className="text-right">
        <p className="text-[9px] text-[#8FA8C8]">
          {label || `Payment Pack ${packId}`} &nbsp;|&nbsp; Issued {issueDate} &nbsp;|&nbsp; Page 1
        </p>
      </div>
    </div>
  );
}