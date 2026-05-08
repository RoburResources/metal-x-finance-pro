import React from "react";

export default function ConfidentialityBlock() {
  return (
    <div className="px-10 pb-6">
      <div className="border border-[#E2E8F0] rounded-xl p-5">
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-2">
          Confidential Document
        </p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">
          This document is confidential and intended solely for the named recipient(s).
          It may not be disclosed, reproduced, or distributed to any third party without
          the prior written consent of Metal X Renewables Pty Ltd.
        </p>
      </div>
    </div>
  );
}