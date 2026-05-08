import React from "react";
import { companyDetails, supplierDetails } from "@/lib/paymentPackData";

export default function SupplierDetails() {
  return (
    <div className="grid grid-cols-2 gap-4 px-8 py-6">
      {/* Issued By */}
      <div className="border border-[#D9DEE7] rounded-lg p-5">
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em] mb-3">
          Issued By
        </p>
        <p className="text-[13px] font-bold text-[#0D1F3C] mb-2">
          {companyDetails.name}
        </p>
        <p className="text-[11px] text-[#4A5568]">ABN {companyDetails.abn}</p>
        <p className="text-[11px] text-[#4A5568]">Perth, Western Australia</p>
        <p className="text-[11px] text-[#4A5568] mt-1">{companyDetails.phone}</p>
        <p className="text-[11px] text-[#4A5568]">{companyDetails.email}</p>
      </div>

      {/* Supplier / Client */}
      <div className="border border-[#D9DEE7] rounded-lg p-5">
        <p className="text-[9px] font-bold text-[#1E4D99] uppercase tracking-[0.1em] mb-3">
          Client
        </p>
        <p className="text-[13px] font-bold text-[#0D1F3C] mb-2">
          {supplierDetails.name}
        </p>
        {supplierDetails.abn !== "[NEEDS CONFIRMATION]" && (
          <p className="text-[11px] text-[#4A5568]">ABN {supplierDetails.abn}</p>
        )}
        {supplierDetails.contactName !== "[NEEDS CONFIRMATION]" && (
          <p className="text-[11px] text-[#4A5568]">{supplierDetails.contactName}</p>
        )}
        {supplierDetails.contactEmail !== "[NEEDS CONFIRMATION]" && (
          <p className="text-[11px] text-[#4A5568]">{supplierDetails.contactEmail}</p>
        )}
        {supplierDetails.address !== "[NEEDS CONFIRMATION]" && (
          <p className="text-[11px] text-[#4A5568]">{supplierDetails.address}</p>
        )}
      </div>
    </div>
  );
}