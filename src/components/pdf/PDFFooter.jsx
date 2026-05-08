import React from "react";
import { companyDetails } from "@/lib/paymentPackData";

export default function PDFFooter({ packId, issueDate }) {
  return (
    <div className="bg-[#0D1F3C] px-8 py-5 flex justify-between items-end mt-auto">
      <div>
        <p className="text-[13px] font-bold text-white">{companyDetails.name}</p>
        <p className="text-[10px] text-[#8FA8C8] mt-0.5">
          ABN {companyDetails.abn} &nbsp;|&nbsp; {companyDetails.email} &nbsp;|&nbsp; Perth, Western Australia
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-[#8FA8C8]">
          Payment Pack {packId} &nbsp;|&nbsp; Issued {issueDate}
        </p>
        <p className="text-[10px] text-[#8FA8C8]">Owens For Scrap</p>
      </div>
    </div>
  );
}