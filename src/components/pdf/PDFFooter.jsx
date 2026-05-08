import React from "react";
import { companyDetails } from "@/lib/paymentPackData";

export default function PDFFooter({ packId, issueDate, pageNum, totalPages }) {
  return (
    <div className="mt-auto pt-6">
      <div className="h-px bg-[#D9DEE7] mb-3" />
      <div className="flex justify-between items-center">
        <p className="text-[7.5px] text-[#6F7472]">
          {companyDetails.name}
        </p>
        <p className="text-[7.5px] text-[#6F7472]">
          ABN {companyDetails.abn} &nbsp;|&nbsp; {companyDetails.email} &nbsp;|&nbsp; Perth, Western Australia
        </p>
      </div>
      <div className="flex justify-between items-center mt-1">
        <p className="text-[7px] text-[#6F7472]">
          Payment Pack {packId} &nbsp;|&nbsp; Issued {issueDate}
        </p>
        {pageNum && (
          <p className="text-[7px] text-[#6F7472]">
            Page {pageNum} of {totalPages}
          </p>
        )}
      </div>
    </div>
  );
}