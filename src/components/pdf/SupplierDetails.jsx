import React from "react";
import { companyDetails, supplierDetails } from "@/lib/paymentPackData";

export default function SupplierDetails() {
  return (
    <div className="grid grid-cols-2 gap-4 px-8 py-5">
      {/* Issued By */}
      <div>
        <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-2">Issued By</p>
        <p className="text-[12px] font-bold text-[#0D1F3C] mb-1">{companyDetails.name}</p>
        <p className="text-[10px] text-[#4A5568]">ABN {companyDetails.abn}</p>
        <p className="text-[10px] text-[#4A5568]">{companyDetails.address}</p>
        <p className="text-[10px] text-[#4A5568]">{companyDetails.email}</p>
        <p className="text-[10px] text-[#4A5568]">{companyDetails.phone}</p>
      </div>

      {/* Client / Supplier */}
      <div>
        <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-2">Client / Supplier</p>
        <p className="text-[12px] font-bold text-[#0D1F3C] mb-1">{supplierDetails.name}</p>
        <p className="text-[10px] text-[#4A5568]">{supplierDetails.legalName}</p>
        <p className="text-[10px] text-[#4A5568]">ABN {supplierDetails.abn}</p>
        <p className="text-[10px] text-[#4A5568]">{supplierDetails.address}</p>
        <p className="text-[10px] text-[#4A5568]">{supplierDetails.phone}</p>
      </div>
    </div>
  );
}