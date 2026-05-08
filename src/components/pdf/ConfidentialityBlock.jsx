import React from "react";

export default function ConfidentialityBlock() {
  return (
    <div className="px-8 pb-6">
      <div className="border border-[#D9DEE7] rounded-lg p-5">
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em] mb-2">
          Confidential Document
        </p>
        <p className="text-[11px] text-[#4A5568] leading-relaxed">
          This document is confidential and intended solely for the named recipient(s).
          It may not be disclosed, reproduced, or distributed to any third party without
          the prior written consent of Metal X Renewables Pty Ltd.
        </p>
      </div>
    </div>
  );
}