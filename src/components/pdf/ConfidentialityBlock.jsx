import React from "react";

export default function ConfidentialityBlock() {
  return (
    <div className="px-8 pb-5">
      <div className="border border-[#E2E8F0] rounded p-4">
        <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-1.5">
          Confidential Document
        </p>
        <p className="text-[10px] text-[#4A5568] leading-relaxed">
          This document is confidential and intended solely for the named recipient(s).
          It may not be disclosed, reproduced, or distributed to any third party without
          the prior written consent of Metal X Renewables Pty Ltd.
        </p>
      </div>
    </div>
  );
}