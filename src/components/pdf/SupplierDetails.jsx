import React from "react";
import { companyDetails, supplierDetails } from "@/lib/paymentPackData";

export default function SupplierDetails() {
  return (
    <div className="grid grid-cols-2 gap-4 px-10 py-6">
      {/* Issued By */}
      <div className="border border-[#E2E8F0] rounded-xl p-5">
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-3">Issued By</p>
        <p className="text-[13px] font-bold text-[#0D1F3C] mb-2">{companyDetails.name}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">ABN {companyDetails.abn}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">{companyDetails.address}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">{companyDetails.email}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">{companyDetails.phone}</p>
      </div>

      {/* Client / Supplier */}
      <div className="border border-[#E2E8F0] rounded-xl p-5">
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.12em] mb-3">Client / Supplier</p>
        <p className="text-[13px] font-bold text-[#0D1F3C] mb-2">{supplierDetails.name}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">{supplierDetails.legalName}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">ABN {supplierDetails.abn}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">{supplierDetails.address}</p>
        <p className="text-[10px] text-[#6B7280] leading-relaxed">{supplierDetails.phone}</p>
      </div>
    </div>
  );
}