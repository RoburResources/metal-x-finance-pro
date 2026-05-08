import React from "react";
import { supplierDetails } from "@/lib/paymentPackData";

export default function SupplierDetails() {
  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-bold text-[#08111F] uppercase tracking-[0.05em] mb-3">
        Supplier Details
      </h3>
      <div className="h-px bg-[#D9DEE7] mb-4" />

      <div className="border border-[#D9DEE7] rounded-sm p-4">
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="text-[7px] font-bold text-[#6F7472] uppercase tracking-[0.04em]">SUPPLIER / CLIENT</p>
            <p className="text-[9px] font-semibold text-[#08111F] mt-0.5">{supplierDetails.name}</p>
          </div>
          <div>
            <p className="text-[7px] font-bold text-[#6F7472] uppercase tracking-[0.04em]">ABN</p>
            <p className="text-[9px] font-medium text-[#08111F] mt-0.5">{supplierDetails.abn}</p>
          </div>
          <div>
            <p className="text-[7px] font-bold text-[#6F7472] uppercase tracking-[0.04em]">ADDRESS</p>
            <p className="text-[9px] font-medium text-[#08111F] mt-0.5">{supplierDetails.address}</p>
          </div>
          <div>
            <p className="text-[7px] font-bold text-[#6F7472] uppercase tracking-[0.04em]">CONTACT</p>
            <p className="text-[9px] font-medium text-[#08111F] mt-0.5">{supplierDetails.contactName}</p>
          </div>
          <div>
            <p className="text-[7px] font-bold text-[#6F7472] uppercase tracking-[0.04em]">EMAIL</p>
            <p className="text-[9px] font-medium text-[#08111F] mt-0.5">{supplierDetails.contactEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}