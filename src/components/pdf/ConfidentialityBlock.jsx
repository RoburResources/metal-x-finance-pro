import React from "react";

export default function ConfidentialityBlock() {
  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-bold text-[#08111F] uppercase tracking-[0.05em] mb-3">
        Confidential Document
      </h3>
      <div className="h-px bg-[#D9DEE7] mb-4" />

      <div className="border border-[#D9DEE7] rounded-sm p-4 bg-[#F4F7FB]">
        <p className="text-[8.5px] text-[#6F7472] leading-relaxed">
          This document is confidential and intended solely for the named recipient(s). 
          It may not be disclosed, reproduced, or distributed to any third party without 
          the prior written consent of Metal X Renewables Pty Ltd.
        </p>
      </div>
    </div>
  );
}